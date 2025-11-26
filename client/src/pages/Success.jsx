
import './styles/Success.css'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Nav from '../components/Nav'
import Footer from '../components/Footer'

function Success() {

    const { t, i18n } = useTranslation();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const orderCode = params.get("orderCode");

  return (
    <div className='Success'>
        <Nav/>

        <div className='contain'>
            <div className='logo'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-16 h-16 text-white" data-source-location="pages/OrderSuccess:36:10" data-dynamic-content="false"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
            </div>

            <h1>{t('Success.orderPlaced')}</h1>
            <h3>{t('Success.subtitle')}</h3>

            <div className='info'>
                <header>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/OrderSuccess:66:12" data-dynamic-content="false"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                    <span>{t('Success.orderNumber')}</span>
                </header>
                <h2>{orderCode}</h2>
                <div>
                    <div>
                        <span>1</span>
                        <div>
                            <p>{t('Success.orderConfirmed')}</p>
                            <span>{t('Success.orderConfirmedSub')}</span>
                        </div>
                    </div>
                    <div>
                        <span style={{ backgroundColor: '#e9d5ff', color: '#7e22ce'}}>2</span>
                        <div>
                            <p>{t('Success.preparing')}</p>
                            <span>{t('Success.preparingSub')}</span>
                        </div>
                    </div>
                    <div>
                        <span style={{ backgroundColor: '#bfdbfe', color: '#1d4ed8'}}>3</span>
                        <div>
                            <p>{t('Success.way')}</p>
                            <span>{t('Success.waySub')}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex'>
                <Link to={`/home#Shop`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/OrderSuccess:117:12" data-dynamic-content="false"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                    {t('Success.continueShopping')}
                </Link>

                <Link to={`/cart?orderCode=${orderCode}#tracking`} style={{ background: '#4f46e5' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cart:185:26" data-dynamic-content="false"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
                    Rastrear mi pedido
                </Link>
            </div>

            <span>{t('Success.thanks')}</span>
            <span>{t('Success.confirmationEmail')}</span>
        </div>

        <Footer/>
    </div>
  )
}

export default Success