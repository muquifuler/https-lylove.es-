
import { useState } from 'react';
import './styles/Footer.css'
import { useSSR, useTranslation } from 'react-i18next';
import { useNavigate, useParams, Link } from 'react-router-dom';

function Footer() {

    const { t, i18n } = useTranslation();
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")

    async function sendEmail() {
        setSuccess(false); 

        await fetch(import.meta.env.VITE_SERVER + 'api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        setSuccess(true);

        setEmail("");
    }

    return (
    <div className='Footer'>
        <div className='info'>
            <div className='subscribe'>
                <h3>✨ {t('Footer.stayUpdated')} ✨</h3>
                <p>{t('Footer.staySub')}</p>
                <div>
                    <input type="text" placeholder='tu@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button onClick={() => sendEmail()}>{t('Footer.subscribe')}</button>
                </div>
                {success && <p className='success-msg'>✅ {t('Footer.emailSent')}</p>}
            </div>
            <div className='about'>
                <h3>{t('Footer.quickLinks')}</h3>
                <div className='links'>
                    <Link to={'/about-us'}>{t('Footer.aboutUs')}</Link>
                    <Link to={'/contact'}>{t('Footer.contact')}</Link>
                    <Link to={'/faq'}>{t('Footer.faq')}</Link>
                    <Link to={'/cookies'}>{t('Footer.cookies')}</Link>
                </div>
            </div>
            <div className='follow'>
                <h3>{t('Footer.followUs')}</h3>
                <div>
                    <div className='icon' onClick={() => window.open('https://www.instagram.com/lylove.es/', '_blank')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="Layout:207:18" data-dynamic-content="false"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    </div>
                    <div className='icon' onClick={() => window.open('https://www.tiktok.com/@lylove.es?lang=es', '_blank')}>
                        <svg style={{ height: '1.7rem', width: '1.7rem'}} viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#ffffff" stroke-linecap="round" stroke-width="12" d="M108 132a38.004 38.004 0 0 1-23.458 35.107 37.995 37.995 0 0 1-41.412-8.237 37.996 37.996 0 0 1-8.237-41.412A38.001 38.001 0 0 1 70 94"></path><path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M108 132V22c0 18 24 50 52 50"></path></g></svg>
                    </div>
                </div>
            </div>
        </div>
        <div className='made'>
            <span>
                {t('Footer.footerText')}
            </span>
        </div>
    </div>
  )
}

export default Footer