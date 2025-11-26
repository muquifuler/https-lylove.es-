
import './styles/Home.css'

import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useUserStore } from '../stores/useUserStore';
import { useTranslation } from 'react-i18next';

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CardBox from '../components/CardBox'

function Home() {

    const { t, i18n } = useTranslation();

    const { hash } = useLocation();
    const products = useUserStore(state => state.products)

    useEffect(() => {
        if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        }
    }, [hash]);

    const tagPriority = ["Best Seller", "New", "Limited Edition"];

    const uniqueProducts = Object.values(
        products.reduce((acc, product) => {
            const key = product.superName;

            if (!acc[key]) {
            acc[key] = product;
            } else {
            const current = acc[key];

            if (product.sort === 1) {
                acc[key] = product;
            } else if (current.sort !== 1 && product.sort === 0) {
                acc[key] = product;
            }
            }

            return acc;
        }, {})
    );

    const sortedProducts = uniqueProducts
        .filter(p => p.visibility !== false)
        .sort((a, b) => {
            const aHasCustom = (a.customText && a.customText.trim() !== '' && parseInt(a.customText) > 0) || (a?.customImg && a?.customImg == "Y");
            const bHasCustom = (b.customText && b.customText.trim() !== '' && parseInt(b.customText) > 0) || (b?.customImg && b?.customImg == "Y");

            if (aHasCustom && !bHasCustom) return -1;
            if (!aHasCustom && bHasCustom) return 1;

            const priorityA = tagPriority.indexOf(a.tag);
            const priorityB = tagPriority.indexOf(b.tag);

            return (priorityA === -1 ? Infinity : priorityA) -
                (priorityB === -1 ? Infinity : priorityB);
    });


  return (
    <div className='Home'>

        <Nav/>

        <div className='center'>
            <div className='info'>
                <div className='tag'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/home/HeroSection:35:14" data-dynamic-content="false"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                    <span>{t('Home.newProductsAvaiable')}</span>
                </div>
                <h1>{t('Home.giftsThatSpeak')}</h1>
                <h1 style={{ color: '#111827' }}>{t('Home.theLanguageOfLove')}</h1>
                <p>{t('Home.subtitle')}</p>
            
                <div className='buttons'>
                    <a href='#Shop'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/home/Hero:60:16" data-dynamic-content="false"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
                        {t('Home.shopGifts')}
                    </a>
                </div>

                <div className='banners'>
                    <div>
                        <div className='icon'>
                            <span>💝</span>
                        </div>
                        <span>{t('Home.premiumQuality')}</span>
                    </div>
                    <div>
                        <div className='icon'>
                            <span>🚚</span>
                        </div>
                        <span>{t('Home.fastShipping')}</span>
                    </div>
                    <div className='lastIcon'>
                        <div className='icon'>
                            <span>🎁</span>
                        </div>
                        <span>{t('Home.giftWrapping')}</span>
                    </div>
                </div>
            </div>
            <div className='img'>
                <div>
                    <div className='icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="components/home/HeroSection:139:18" data-dynamic-content="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    </div>
                    <div className='data'>
                        <p>10,000+ {t('Home.happyCouples')}</p>
                        <span>{t('Home.slWorldwide')}</span>
                    </div>
                </div>
                {/*https://blogpsicologia.copmadrid.org/wp-content/uploads/2019/05/pareja.jpg*/}
                <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=900&fit=crop" alt="" />
            </div>
        </div>

        <svg data-source-location="components/hero/HeroSection:269:8" data-dynamic-content="false" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-source-location="components/hero/HeroSection:270:10" data-dynamic-content="false" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"></path></svg>    

        <div className='content' id='Shop'>


            <h2>
                {t('Home.our')}
                <span>{t('Home.loveCollection')}</span>
            </h2>

            <p>{t('Home.contentSubtitle')}</p>

            <div className='grid'>
                {sortedProducts.map((e, i) => (
                    <CardBox key={i} data={e}/>
                ))}
            </div>

            <div className='banner'>
                <div>
                    <div className='icon'>
                        <span>💝</span>
                    </div>
                    <p>{t('Home.premiumQuality')}</p>
                    <span>{t('Home.subPremiumQuality')}</span>
                </div>
                <div>
                    <div className='icon'>
                        <span>🚚</span>
                    </div>
                    <p>{t('Home.fastShipping')}</p>
                    <span>{t('Home.subFastShipping')}</span>
                </div>
                <div>
                    <div className='icon'>
                        <span>🎁</span>
                    </div>
                    <p>{t('Home.giftWrapping')}</p>
                    <span>{t('Home.subGiftWrapping')}</span>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Home
