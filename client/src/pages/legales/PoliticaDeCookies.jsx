import './styles/PoliticaDeCookies.css'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

function PoliticaDeCookies() {

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const tipos = [{
        name: "🍪 Cookies Esenciales",
        desc: "Necesarias para el funcionamiento básico del sitio. Permiten la navegación y el uso de funciones esenciales como el carrito de compras y el proceso de pago."
    },{
        name: "📊 Cookies Analíticas",
        desc: "Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, recopilando información de forma anónima sobre las páginas visitadas y el tiempo de navegación."
    },{
        name: "🎯 Cookies de Funcionalidad",
        desc: "Permiten recordar tus preferencias y personalizar tu experiencia, como el idioma seleccionado o los productos favoritos."
    },{
        name: "📢 Cookies de Marketing",
        desc: "Se utilizan para mostrar anuncios relevantes y medir la efectividad de nuestras campañas publicitarias."
    }]

  return (
    <div className='PoliticaDeCookies'>
        <Nav/>
        
        <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cookies:17:12" data-dynamic-content="false"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>
        </div>

        <h1>
            Política de
            <span>Cookies</span>
        </h1>
        <p>última actualización: Noviembre 2025</p>

        <section>
            <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cookies:36:16" data-dynamic-content="false"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                <h3>¿Qué son las cookies?</h3>
            </header>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia de navegación y a entender cómo utilizas nuestra plataforma.</p>
        
            <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cookies:45:16" data-dynamic-content="false"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <h3>Tipos de cookies que utilizamos</h3>
            </header>

            {tipos.map((e, i) => (
                <section key={i}>
                    <p>{e.name}</p>
                    <span>{e.desc}</span>
                </section>
            ))}

            <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/Cookies:83:16" data-dynamic-content="false"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <h3>Control de cookies</h3>
            </header>
            <p>Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de los navegadores para evitar que se instalen.</p>
            <p>Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites nuestro sitio y que algunos servicios y funcionalidades no funcionen correctamente.</p>

            <header>
                <h3>Gestión de cookies en tu navegador</h3>
            </header>
            <ul>
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
            </ul>
            
            <header>
                <h3>Cambios en nuestra política</h3>
            </header>
            <p>Podemos actualizar nuestra Política de Cookies periódicamente. Te notificaremos sobre cualquier cambio publicando la nueva política en esta página y actualizando la fecha de "última actualización".</p>

            <header>
                <h3>Contacto</h3>
            </header>
            <p>Si tienes preguntas sobre nuestra Política de Cookies, contáctanos en: <a href='#'>lylove-help@outlook.com</a></p>

        </section>

        <Footer/>
    </div>
  )
}

export default PoliticaDeCookies