import './styles/PreguntasFrecuentes.css'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

function PreguntasFrecuentes() {

    const [open, setOpen] = useState({ i: -1 , ii: -1 })

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const questions =[{
        name: "Pedidos y Envíos",
        questions: [{
            name: "¿Cuánto tiempo tarda la entrega?",
            desc: "Ofrecemos envío estándar (7-15 días laborables) para pedidos personalizados y envío express (2-3 días) o estándar (5-7 días) para productos normales. El tiempo puede variar según tu ubicación. Recibirás un número de seguimiento al comprar tu producto."
        },{
            name: "¿Envían internacionalmente?",
            desc: "Sí, enviamos a la mayoría de los países. Los costos y tiempos de envío internacional varían según el destino. Consulta las opciones disponibles durante el proceso de compra."
        },{
            name: "¿Puedo rastrear mi pedido?",
            desc: "¡Por supuesto! Una vez que tu pedido sea enviado, recibirás un email con un número de seguimiento para que puedas rastrear tu paquete en tiempo real, desde el carrito."
        }]
    },{
        name: "Productos y Personalización",
        questions: [{
            name: "¿Cómo funciona la personalización de productos?",
            desc: "En la página del producto, encontrarás opciones de personalización disponibles. Puedes seleccionar opciones predefinidas, subir imágenes personalizadas y agregar mensajes especiales. Nuestro equipo revisará tu diseño antes de proceder."
        },{
            name: "¿Qué formato de imagen debo usar para personalización?",
            desc: "Aceptamos imágenes en formato JPG, PNG y GIF. Para mejores resultados, recomendamos imágenes de alta resolución (mínimo 300 DPI). El tamaño máximo de archivo es 10MB."
        },{
            name: "¿Los productos vienen con envoltorio de regalo?",
            desc: "¡Sí! Todos nuestros productos incluyen envoltorio de regalo premium sin costo adicional."
        }]
    },{
        name: "Pagos y Seguridad",
        questions: [{
            name: "¿Qué métodos de pago aceptan?",
            desc: "Aceptamos todas las principales tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal, y transferencias bancarias. Todos los pagos son procesados de forma segura con Stripe."
        },{
            name: "¿Es seguro comprar en su sitio?",
            desc: "Absolutamente. Utilizamos Stripe para proteger toda tu información personal y de pago. Nunca almacenamos los datos de tu tarjeta."
        }]
    }]

  return (
    <div className='PreguntasFrecuentes'>
        <Nav/>
        
        <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/FAQ:112:12" data-dynamic-content="false"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
        </div>

        <h1>
            Preguntas
            <span>Frecuentes</span>
        </h1>
        <p>Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios</p>

        {questions.map((e, i) => (
            <div className='questions' key={i}>
                <header>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/FAQ:131:16" data-dynamic-content="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    <h2>{e.name}</h2>
                </header>
                {e.questions.map((ee, ii) => (
                    <div key={ii} style={{ borderTop: ii == 0 ? 'solid 1px transparent' : 'solid 1px #ffe4e6'}}>
                        <button onClick={() => setOpen((open.i == i && open.ii == ii) ? { i: -1, ii: -1 } : { i, ii })}>
                            {ee.name}
                            <svg style={{ transform: (open.i == i && open.ii == ii) ? 'rotate(180deg)' : '' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/FAQ:154:24" data-dynamic-content="false"><path d="m6 9 6 6 6-6"></path></svg>
                        </button>
                        {(open.i == i && open.ii == ii) && <p>{ee.desc}</p>}
                    </div>
                ))}
            </div>
        ))}

        <section>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/FAQ:190:10" data-dynamic-content="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            <h3>¿No encontraste tu respuesta?</h3>
            <p>Nuestro equipo está listo para ayudarte con cualquier pregunta adicional.</p>
            <Link to={'/contact'}>Contáctanos</Link>
        </section>

        <Footer/>
    </div>
  )
}

export default PreguntasFrecuentes