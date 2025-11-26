
import './styles/Details.css'

import { useUserStore } from '../stores/useUserStore';
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CardItem from '../components/CardItem'
import CardBox from '../components/CardBox';

function Details() {

    const { t, i18n } = useTranslation();
    const { id } = useParams();

    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const cart = useUserStore(state => state.cart);
    const products = useUserStore(state => state.products)
    const addProduct = useUserStore(state => state.addProduct)

    const product = products.find(p => p._id === id);
    const cartItem = cart.find(item => item.product._id === product._id);
    const alreadyInCart = cartItem ? cartItem.quantity : 0;

    const uniqueProducts = products.filter(
        (obj, index, self) =>
            index === self.findIndex((o) => o.superName === obj.superName)
    );

    const relatedProducts = products.filter((item) => item.superName == product.superName)

    const [quantity, setQuantity] = useState(1)

    // Selector de colores para: Rosa de Amor – Caja Joyero Personalizada
    const colors = ["#eed6a6", "#eae9e9", "#fbd4ba"]
    const [selColor, setSelColor] = useState(colors[0])

    // Custom data
    const fileInputRef = useRef(null);
    const [aditionalData, setAditionalData] = useState({
        nombre1: "",
        nombre2: "",
        desc: "",
        fecha: "",
        localizacion: "",
        image: null, 
        color: ""
    })

    const handleDataChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setAditionalData({ 
                ...aditionalData, 
                [name]: files[0]  // guarda el File
            });
        } else {
            setAditionalData({ ...aditionalData, [name]: value });
        }
    };

    function validateForm() {
        let newErrors = {};

        if (parseInt(product?.customText) > 0){
            if(!aditionalData.nombre1) newErrors.nombre1 = true;
            if(parseInt(product?.customText) > 1){
                if(!aditionalData.nombre2) newErrors.nombre2 = true;
            }
        }

        if(product?.customImg == "Y" && !aditionalData.image) newErrors.image = true
        if(product?.name == "Lámpara de constelaciones personalizada"){
            if(!aditionalData.desc) newErrors.desc = true
            if(!aditionalData.fecha) newErrors.fecha = true
            if(!aditionalData.localizacion) newErrors.localizacion = true
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div className='Details'>

            <Nav/>
            <div className='top'>
                <Link to={'/home#Shop'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/ProductDetail:132:10" data-dynamic-content="false"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                    {t('Details.backToShop')}
                </Link>
            </div>

            <div className='product'>
                <div className='left'>
                    <div className='image'>
                        {product?.tag != "" && <div className='tag' style={{ background: product?.tag == "New" ? 'linear-gradient(to right, #34d399 , #14b8a6)' : 
                            product?.tag == "Limited Edition" ? 'linear-gradient(to right, #c084fc , #ec4899)' : null}}>
                            <span>{product?.tag == "Best Seller" ? t('CardBox.bestSeller') : 
                                    product?.tag == "New" ? t('CardBox.new') : 
                                    product?.tag == "Limited Edition" ? t('CardBox.limitedEdition') : ''}</span>
                        </div>}

                        {((product?.customText && parseInt(product?.customText) > 0) || (product?.customImg && product?.customImg == "Y")) && <div className='custom'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/home/ProductCard:68:14" data-dynamic-content="false"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                            <span>{t('CardBox.custom')}</span>
                        </div>}
                        {/*<div className='imgs'>
                            {relatedProducts.length > 1 && relatedProducts.map((e, i) => (
                                <Link to={'/product/'+e._id} key={i}>
                                    <img src={e.img} alt="" />
                                </Link>
                            ))}
                        </div>*/}
                        <img src={product?.img} alt="" />
                    </div>

                    {relatedProducts.length > 1 && <p>Color:</p>}
                    <div className='colors'>
                        {relatedProducts.length > 1 && relatedProducts.map((e, i) => (
                            <Link to={'/product/'+e._id} key={i} className={e.name == product.name ? 'sel' : ''}>
                                <img src={e.img} alt="" />
                            </Link>
                        ))}
                    </div>

                    {product?.superName == "Rosa de Amor – Caja Joyero Personalizada" && <><p>{t('Details.colorCollar')}:</p>
                    <div className='colors'>
                        {colors.map((e, i) => (
                            <a key={i} className={e == selColor ? 'sel' : ''} onClick={() => setSelColor(e)} href='#' style={{ backgroundColor: e }}></a>
                        ))}
                    </div></>}

                    {product?.customText && parseInt(product?.customText) > 0 && <>
                        <p>{t('Details.customText')}:</p>
                        <div className='two'>
                            <input type="text" name='nombre1' className={errors.nombre1 ? "error" : ""} value={aditionalData.nombre1} onChange={handleDataChange} placeholder={t('Details.myName')} spellCheck="false" maxLength='20'/>
                            {parseInt(product?.customText) > 1 && <input name='nombre2' className={errors.nombre2 ? "error" : ""} value={aditionalData.nombre2} type="text" onChange={handleDataChange} placeholder={t('Details.hisName')} spellCheck="false" maxLength='20'/>}
                        </div>
                        
                        {product?.name == "Lámpara de constelaciones personalizada" && <div className='two' style={{ marginTop: '.75rem'}}>
                            <input type="text" name="desc" className={errors.desc ? "error" : ""} onChange={handleDataChange} value={aditionalData.desc} placeholder='Texto personalizado' maxLength='30'/>
                        </div>}
                    </>}

                    {product?.name == "Lámpara de constelaciones personalizada" && <div className='date'>
                        <div>
                            <p>{t('Details.fecha')}: </p>
                            <input name="fecha" onChange={handleDataChange} className={errors.fecha ? "error" : ""} type="date" id="" value={aditionalData.fecha}/>
                        </div>
                        <div>
                            <p>{t('Details.localizacion')}: </p>
                            <input name="localizacion" onChange={handleDataChange} className={errors.localizacion ? "error" : ""} type="text" value={aditionalData.localizacion} id="" placeholder='Madrid' spellCheck="false" maxLength='20'/>
                        </div>
                    </div>}

                    {product?.customImg == "Y" && <>
                        <p>{t('Details.imagen')}:</p>
                        <div className={errors.image ? "uploadImage error" : "uploadImage"} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                            <input type="file" accept='image/*' name="image" onChange={handleDataChange} ref={fileInputRef} />
                            {aditionalData.image && (
                                <img 
                                    src={URL.createObjectURL(aditionalData.image)} 
                                    alt="preview" 
                                    style={{ width: '100px', marginTop: '10px' }}
                                />
                            )}
                            {!aditionalData.image && <>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/ProductDetail:304:30" data-dynamic-content="false"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                                </div>
                                <p>Haz clic para subir tu imagen</p>
                                <span>PNG, JPG hasta 10 MB</span>
                            </>}
                        </div>
                    </>}


                    
                </div>

                <div className='right'>
                    <h3>{product?.name}</h3>
                    <pre>{product?.desc}</pre>

                    <div className='price'>
                        <p>€{product?.price}</p>
                        <span>{t('Details.perUnit')}</span>
                    </div>
                    <div className='quantity'>
                        <p>{t('Details.quantity')}</p>
                        <div>
                            <button onClick={() => quantity > 1 ? setQuantity(quantity-1) : null}>-</button>
                            <p>{alreadyInCart < product?.stock ? quantity : 0}</p>
                            <button onClick={() => quantity + alreadyInCart < product?.stock ? setQuantity(quantity + 1) : null}>+</button>
                        </div>
                    </div>
                    <button disabled={!(alreadyInCart < product?.stock)} onClick={() => {
                        if(validateForm()){
                            addProduct(product, quantity, aditionalData)
                            setQuantity(1)
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/ProductDetail:251:16" data-dynamic-content="false"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                        {alreadyInCart < product?.stock ? t('Details.add')+` ${quantity} `+t('Details.toCart') : t('Details.noMore')}
                    </button>
 
                </div>
            </div>

            {product?.items.length > 0 && <div className='content'>
                <div className='gridImgs'>
                    {product?.items.slice(0, 4).map((e, i) => (
                        <CardItem key={i} data={e}/>
                    ))}
                </div>
            </div>}

            <div className='content'>

                <span>{t('Details.youMayAlsoLike')}</span>

                <div className='grid'>
                    {uniqueProducts.filter((item) => item.visibility !== false && item.superName != product.superName)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map((e, i) => (
                        <CardBox key={i} data={e}/>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Details