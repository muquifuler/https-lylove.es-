import './styles/Cart.css'

import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useTranslation } from 'react-i18next';

import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Cart() {
    
    const { t, i18n } = useTranslation();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderCode = params.get("orderCode");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (orderCode) {
            setOrderCodeInput(orderCode)
            const el = document.getElementById("tracking");
            if (el) el.scrollIntoView({ behavior: "smooth" });

            getTrackingData(orderCode)
        }
    }, [orderCode]);

    const [errCode, setErrCode] = useState("")
    const [orderCodeInput, setOrderCodeInput] = useState("")
    const [trackingData, setTrackingData] = useState(null)

    const [isGift, setIsGift] = useState(false)

    const cart = useUserStore(state => state.cart)
    const removeProduct = useUserStore(state => state.removeProduct);
    const increaseQuantity = useUserStore(state => state.increaseQuantity);
    const decreaseQuantity = useUserStore(state => state.decreaseQuantity);

    const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    const precioEnvio = 5

    const shippingFreeThreshold = 80;
    const missingForFreeShipping = Math.max(0, shippingFreeThreshold - subtotal);
    const shippingCost = subtotal >= shippingFreeThreshold ? 0 : 3;

    async function getTrackingData(orderCode){
        const res = await fetch(import.meta.env.VITE_SERVER + "api/get-tracking-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderCode }),
        });
        const data = await res.json();
        
        if(!data.order) setErrCode(orderCode)
        setTrackingData(data.order || "Not found")
    }

    const checkout = async () => {
        const res = await fetch(import.meta.env.VITE_SERVER + "api/payments/create-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cart.map(item => ({
                    id: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    product: item.product,
                    aditionalData: item.aditionalData
                })),
                isGift
            }),
        });
        const data = await res.json();
        window.location.href = data.url;
    };

  return (
    <div className='Cart'>

        <Nav/>
        <div className='top'>
            <Link to={`/home#Shop`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/ProductDetail:132:10" data-dynamic-content="false"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                {t('Cart.continueShopping')}
            </Link>
        </div>

        <div className='orders'>
            <header>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:66:12" data-dynamic-content="false"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <h1>{t('Cart.yourCart')}</h1>
                </div>
                <span>{totalUnits} {t('Cart.itemWaitingForYou')} ✨</span>
            </header>

            <div>
                <div className='left'>
                    {cart.map((e, i) => (
                        <div key={i} className='item'>
                            <img src={e.product.img} alt="" />
                            <div>
                                <div className='data'>
                                    <h3>{e.product.name}</h3>
                                    <p>€{e.product.price} {t('Cart.each')}</p>
                                    <div>
                                        <button onClick={() => decreaseQuantity(e.product._id)}>-</button>
                                        <span>{e.quantity}</span>
                                        <button onClick={() => increaseQuantity(e.product._id)}>+</button>
                                    </div>
                                    {
                                        (e.aditionalData.nombre1 || e.aditionalData.nombre2 || 
                                        e.aditionalData.desc || e.aditionalData.fecha ||
                                        e.aditionalData.localizacion || e.aditionalData.color ||
                                        e.aditionalData.image) &&
                                        <div className='aditional'>
                                        <h3>{t('Cart.aditionalData')}</h3>
                                        <div>
                                            {e.aditionalData.nombre1 && <p>{t('Cart.name')} 1: <span>{e.aditionalData.nombre1}</span></p>}
                                            {e.aditionalData.nombre2 && <p>{t('Cart.name')} 2: <span>{e.aditionalData.nombre2}</span></p>}
                                            {e.aditionalData.desc && <p>{t('Cart.description')}: <span>{e.aditionalData.desc}</span></p>}
                                            {e.aditionalData.fecha && <p>{t('Cart.date')}: <span>{e.aditionalData.fecha}</span></p>}
                                            {e.aditionalData.localizacion && <p>{t('Cart.location')}: <span>{e.aditionalData.localizacion}</span></p>}
                                            {e.aditionalData.color && <p>{t('Cart.color')}: <span>{e.aditionalData.color}</span></p>}
                                            {e.aditionalData.image && <p>{t('Cart.image')}: </p>}
                                            {e.aditionalData.image && (
                                                <img 
                                                    src={URL.createObjectURL(e.aditionalData.image)} 
                                                    alt="preview" 
                                                />
                                            )}
                                        </div>
                                    </div>}
                                </div>
                                <div className='actions'>
                                    <span>€{(e.quantity*e.product.price).toFixed(2)}</span>
                                    <div className='delete' onClick={() => removeProduct(e.product._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/cart/CartItem:70:12" data-dynamic-content="false"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='right'>
                    <div className='summary'>

                        <h2>{t('Cart.orderSummary')}</h2>
                        <div className='normal'>
                            <span>Subtotal</span>
                            <p>€{subtotal.toFixed(2)}</p>
                        </div>
                        <div className='normal'>
                            <span>{t('Cart.shipping')}</span>
                            <p style={{ color: subtotal >= shippingFreeThreshold ? '#16a34a' : 'inherit' }}>
                                {shippingCost === 0 ? t('Cart.free')+' 🚚' : `€${shippingCost.toFixed(2)}`}
                            </p>
                        </div>
                        
                        {subtotal < shippingFreeThreshold && (
                            <div className='freeShipping'>
                                <span>💝 {t('Cart.add')} €{missingForFreeShipping.toFixed(2)} {t('Cart.more')}</span>
                            </div>
                        )}

                        <div className='line'></div>

                        <div className='total'>
                            <span>Total</span>
                            <p>€{(subtotal + shippingCost).toFixed(2)}</p>
                        </div>

                        <div className='gift' onClick={() => setIsGift(!isGift)}>
                            <section>
                                {isGift && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/ui/checkbox:16:6" data-dynamic-content="false"><path d="M20 6 9 17l-5-5"></path></svg>}
                            </section>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:396:22" data-dynamic-content="false"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
                            <div>
                                <p>Es un regalo</p>
                                <span>Incluye envoltorio especial gratis</span>
                            </div>
                        </div>

                        <button onClick={checkout} disabled={cart.length == 0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/cart/CartSummary:59:12" data-dynamic-content="false"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            {cart.length == 0 ? t('Cart.empty') : t('Cart.proceed')}
                        </button>

                        <span>{t('Cart.secure')}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className='tracking' id='tracking'>
            <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:98:14" data-dynamic-content="false"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                <h3>Rastrear Pedido</h3>
            </header>
            <p>Ingresa tu código de rastreo para ver el estado de tu envío</p>
            <div>
                <input type="text" placeholder='Ej: LYL-123456789' value={orderCodeInput} onChange={(e) => setOrderCodeInput(e.target.value)}/>
                <button onClick={async () => await getTrackingData(orderCodeInput)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:98:14" data-dynamic-content="false"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                    Rastrear
                </button>
            </div>
            
            {trackingData && <>
                {trackingData != "Not found" && <section className='found'>

                    <div>
                        <header>
                            <div>
                                <p>Código: {trackingData?.orderCode}</p>
                                {/*<span>Entrega estimada: 2-3 días hábiles</span>*/}
                            </div>
                            <p>  {{
                                    1: "Confirmado",
                                    2: "Empaquetado",
                                    3: "En Tránsito",
                                    4: "En Reparto"
                                }[trackingData?.shippingStatus] || "Pendiente"}</p>
                        </header>
                            
                        <div>
                            <div className={trackingData?.shippingStatus >= 1 ? '' : 'disabled'}>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:151:26" data-dynamic-content="false"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                                </div>
                                <div className='data'>
                                    <h3>Pedido Confirmado</h3>
                                    <p>Tu pedido ha sido confirmado y está siendo preparado</p>
                                    {/*<span>Hace 2 días</span>*/}
                                </div>
                            </div>

                            <div className={trackingData?.shippingStatus >= 2 ? '' : 'disabled'}>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:151:26" data-dynamic-content="false"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                                </div>
                                <div className='data'>
                                    <h3>Empaquetado</h3>
                                    <p>Tu regalo ha sido empaquetado con amor y cuidado</p>
                                    {/*<span>Hace 1 día</span>*/}
                                </div>
                            </div>

                            <div className={trackingData?.shippingStatus >= 3 ? '' : 'disabled'}>
                                <div className='icon' style={{ backgroundColor: '#4f46e5' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:185:26" data-dynamic-content="false"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
                                </div>
                                <div className='data'>
                                    <h3>En Tránsito</h3>
                                    <p>Tu paquete está en camino a su destino</p>
                                    {/*<span style={{ color: '#4f46e5', fontWeight: '700' }}>Última actualización: Hace 3 horas</span>*/}
                                </div>
                            </div>

                            <div className={trackingData?.shippingStatus >= 4 ? '' : 'disabled'}>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:202:26" data-dynamic-content="false"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div className='data'>
                                    <h3>En reparto</h3>
                                    <p>El paquete llegará pronto a tu dirección</p>
                                    {/*<span>Pendiente</span>*/}
                                </div>
                            </div>
                        </div>


                        {trackingData?.updatedAt && <footer>
                            <span>
                                <strong>📍 Última actualización:</strong>
                                {trackingData?.updatedAt && new Date(trackingData.updatedAt).toLocaleString("es-ES")}
                            </span>
                        </footer>}
                    </div>
                </section>}

                {trackingData == "Not found" && <section className='no-found'>
                    <div>
                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:136:22" data-dynamic-content="false"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                        </div>
                        <h2>Código no encontrado</h2>
                        <p>No pudimos encontrar ningún pedido con el código <strong>{errCode}</strong></p>
                        <span>Por favor verifica que el código sea correcto y no haya caducado o <Link to={'/contact'}>contacta</Link> a nuestro servicio al cliente.</span>   
                    </div>
                </section>}
            </>}

        </div>

        <Footer/>
    </div>
  )
}

export default Cart