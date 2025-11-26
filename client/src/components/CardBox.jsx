
import './styles/CardBox.css'

import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CardBox({ data }) {

    const { t, i18n } = useTranslation();

    return (
    <Link to={'/product/'+data?._id} className='CardBox'>
        <div className='image'>
            {data?.tag != "" && <div className='tag' style={{ background: data?.tag == "New" ? 'linear-gradient(to right, #34d399 , #14b8a6)' : 
                data?.tag == "Limited Edition" ? 'linear-gradient(to right, #c084fc , #ec4899)' : null}}>
                <span>{data?.tag == "Best Seller" ? t('CardBox.bestSeller') : 
                    data?.tag == "New" ? t('CardBox.new') : 
                    data?.tag == "Limited Edition" ? t('CardBox.limitedEdition') : ''}</span>
            </div>}
            {((data?.customText && parseInt(data?.customText) > 0) || (data?.customImg && data?.customImg == "Y")) && <div className='custom'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/home/ProductCard:68:14" data-dynamic-content="false"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                <span>{t('CardBox.custom')}</span>
            </div>}
            {/*<div className='left'>
                <span>{data?.colection}</span>
            </div>*/}
            <div className='view'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/product/ProductCard:62:14" data-dynamic-content="false"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    {t('CardBox.viewDetails')}
                </button>
            </div>
            <img src={data?.img} alt="" />
            {/*<img src={data?.items[0].img} alt="" />*/}
        </div>
        <div className='content'>
            <p>{data?.superName}</p>
            <span>{data?.desc}</span>
            <div>
                <p>€{data?.price}</p>
                <span>{t('CardBox.inStock')}</span>
            </div>
        </div>
    </Link>
  )
}

export default CardBox