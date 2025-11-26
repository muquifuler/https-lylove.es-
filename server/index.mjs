import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT; 

const allowedOrigins = process.env.DOMINIO.split(",");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/webhook')) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use((req, res, next) => {
  const ipAddress = req.ip;
  next();
});

const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

let isConnected = false;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("MongoDB conectado");
  }
}

function generateOrderCode() {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `LYL-${randomPart}`;
}

app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            if (session.payment_status === 'paid') {

                let userEmail = session.customer_email;

                if (!userEmail && session.customer) {
                    const customer = await stripe.customers.retrieve(session.customer);
                    userEmail = customer.email;
                }

                const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
                  expand: ['data.price.product']
                });

                await connectToDatabase();
                const database = client.db("lovely");
                const collection = database.collection('Orders');
   
                //const orderCode = session.metadata.orderCode;
                //const isGift = session.metadata.isGift;
                await collection.updateOne(
                    { stripeSessionId: session.id }, 
                    {
                        $set: {
                          updatedAt: new Date(),
                          shippingStatus: 1,
                          status: "paid"
                        }
                    }
                );

                /*const orderData = {
                    stripeSessionId: session.id,
                    orderCode,
                    userEmail,
                    items: lineItems.data.map(item => ({
                        name: item.description,
                        quantity: item.quantity,
                        amount_total: item.amount_total,
                        currency: item.currency
                    })),
                    total: session.amount_total,
                    currency: session.currency,
                    shipping: session.shipping || null,
                    isGift,
                    shippingStatus: 1,
                    status: "paid",
                    createdAt: new Date()
                };*/


                /*const transporter = nodemailer.createTransport({
                    host: "smtp.office365.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

              (async () => {
                try {
                  const info = await transporter.sendMail({
                    from: `"lovely 🕯️" <${process.env.EMAIL_USER}>`,
                    to: session.customer_email,
                    subject: "Gracias por tu compra 💌",
                    html: `
                        <h2>¡Tu pedido está confirmado y en camino! 🛍️</h2>
                        <p><strong>Número de pedido:</strong> ${orderCode}</p>
                        <p><strong>Total:</strong> ${(session.amount_total / 100).toFixed(2)} ${session.currency.toUpperCase()}</p>
                        <br>
                        <p>Gracias por confiar en lovely, puedes ver el estado de tu pedido introduciendo el codigo LYL en https://www.lylove.es/cart</p>
                        `
                  });

                  console.log("Message sent: %s", info.messageId);
                  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                } catch (err) {
                  console.error("Error while sending mail", err);
                }
              })();*/
            }
        }

        res.json({ received: true });

    } catch (err) {
        console.error("❌ Webhook error:", err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

app.post('/api/payments/create-session', async (req, res) => {

    const { items, isGift } = req.body;

    try {
        // ✅ Calcular total
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // ✅ Si supera 80€, envío gratis
        const shippingCost = total >= 80 ? 0 : 300; // 300 = 3.00€

        const orderCode = generateOrderCode();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `http://localhost:5173/success?orderCode=${orderCode}`, //success_url: `https://lylove.es/success?orderCode=${orderCode}`,
            cancel_url: "http://localhost:5173/cancel", //cancel_url: "https://lylove.es/cancel",
            metadata: {
              orderCode,
              isGift
            },
            line_items: items.map(item => ({
                price_data: {
                    currency: "eur", // ✅ Euro
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price * 100), 
                },
                quantity: item.quantity,
            })),

            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: shippingCost, currency: "eur" },
                        display_name: shippingCost === 0 ? "Envío gratis" : "Envío estándar",
                    },
                },
            ],

            shipping_address_collection: {
                allowed_countries: ["ES"],
            },
        });

        await connectToDatabase();
        const database = client.db("lovely");
        const collection = database.collection('Orders');

        const orderData = {
            stripeSessionId: session.id,
            orderCode,
            //userEmail,
            items,
            total: session.amount_total,
            currency: session.currency,
            shipping: session.shipping || null,
            isGift,
            shippingStatus: 0,
            status: "pending",
            updatedAt: new Date(),
            createdAt: new Date()
        };

        await collection.insertOne(orderData);

        res.json({ url: session.url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Stripe error" });
    }
});

// Contact
app.post('/api/send-email', async (req, res) => {
  try {
    await connectToDatabase();
    const database = client.db("lovely");
    const collection = database.collection('EmailsForUpdates');

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "No se envió el email." });
    }

    const result = await collection.insertOne({
      email,            // <--- guardamos el email correctamente
      createdAt: new Date()
    });

    console.log("Email recibido y guardado:", result.insertedId);

    return res.status(200).json({
      message: "Email enviado correctamente.",
      id: result.insertedId
    });

  } catch (e) {
    console.error("Error al guardar el Email:", e);
    return res.status(500).json({ error: "Error interno al guardar los datos." });
  }
});


app.post('/api/send-form', async (req, res) => {
  try {
    await connectToDatabase();
    const database = client.db("lovely");
    const collection = database.collection('Contact');

    const { form } = req.body;

    if (!form) {
      return res.status(400).json({ error: "No se envió el formulario." });
    }

    // Insertar en la BD
    const result = await collection.insertOne({
      ...form,
      createdAt: new Date()
    });

    console.log("Formulario recibido y guardado:", result.insertedId);

    return res.status(200).json({
      message: "Formulario enviado correctamente.",
      id: result.insertedId
    });

  } catch (e) {
    console.error("Error al guardar el formulario:", e);
    return res.status(500).json({ error: "Error interno al guardar los datos." });
  }
});

app.post('/api/get-tracking-data', async (req, res) => {
  try {
    await connectToDatabase();
    const database = client.db("lovely");
    const collection = database.collection('Orders');

    const { orderCode } = req.body

    if (!orderCode) return res.status(400).json({ error: 'orderCode requerido' });

    const order = await collection.findOne({ orderCode });

    if (!order) return res.status(404).json({ error: 'Pedido no encontrado' });

    res.status(200).json({ order });

  } catch (error) {
    console.error('❌ Error al obtener orders:', error);
    res.status(500).json({ error: 'Error al obtener orders' });
  }
});

// PRODUCTS
// GET: obtener todos los productos
app.get('/api/get-products', async (req, res) => {
  try {
    await connectToDatabase();
    const database = client.db("lovely");
    const collection = database.collection('Products');

    const products = await collection.find({}).toArray();
    res.status(200).json({ products });

  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST: actualizar todos los productos (reemplazar)
app.post('/api/update-products', async (req, res) => {
  try {
    await connectToDatabase();
    const database = client.db("lovely");
    const collection = database.collection('Products');

    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Products inválido' });
    }

    // ❌ Eliminar todo y reemplazar
    await collection.deleteMany({});
    await collection.insertMany(products);

    res.status(200).json({ message: '✅ Productos actualizados en MongoDB' });

  } catch (error) {
    console.error('❌ Error al actualizar productos:', error);
    res.status(500).json({ error: 'Error al actualizar productos' });
  }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});




