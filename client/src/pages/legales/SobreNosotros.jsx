import './styles/SobreNosotros.css'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

function SobreNosotros() {

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

  return (
    <div className='SobreNosotros'>
        <Nav/>

        <section className='one'>
            <div className='tag'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/AboutUs:18:14" data-dynamic-content="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                <span>Nuestra Historia</span>
            </div>

            <h1>
                Sobre
                <span>Nosotros</span>
            </h1>
            <p>Creamos experiencias que celebran el amor y fortalecen las conexiones entre las personas que más importan.</p>

            <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=600&fit=crop" alt="" />
        </section>

        <section className='two'>
            <h2>Nuestra Misión</h2>
            <p>En Lylove, creemos que cada regalo cuenta una historia. Nos dedicamos a curar y crear productos únicos que expresen lo que las palabras a veces no pueden decir.</p>
            <p>Desde nuestros inicios, hemos ayudado a más de 10,000 parejas a encontrar el regalo perfecto para sus momentos especiales. Cada producto es seleccionado cuidadosamente pensando en la calidad, el significado y la emoción que transmite.</p>
            <p>No solo vendemos productos, creamos experiencias memorables que fortalecen los lazos del amor.</p>
        </section>

        <section className='three'>
            <h2>Nuestros Valores</h2>
            <p>Los principios que guían cada decisión que tomamos</p>

            <div className='grid'>
                <div>
                    <div className='icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/AboutUs:99:16" data-dynamic-content="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    </div>
                    <h3>Amor y Pasión</h3>
                    <p>Ponemos amor en cada detalle, desde la selección de productos hasta el envoltorio de regalo.</p>
                </div>
                <div>
                    <div className='icon' style={{ background: 'linear-gradient(to bottom right, #fbbf24 , #f97316)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/AboutUs:117:16" data-dynamic-content="false"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                    </div>
                    <h3>Calidad Premium</h3>
                    <p>Solo ofrecemos productos de la más alta calidad que reflejan el valor de tus sentimientos.</p>
                </div>
                <div>
                    <div className='icon' style={{ background: 'linear-gradient(to bottom right, #c084fc , #6366f1)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="pages/AboutUs:135:16" data-dynamic-content="false"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3>Comunidad</h3>
                    <p>Somos una comunidad de personas que creen en el poder de los pequeños gestos de amor.</p>
                </div>
            </div>
        </section>

        <section className='four'>

            <div>
                <h4>10K+</h4>
                <p>Parejas Felices</p>
            </div>
            <div>
                <h4>50+</h4>
                <p>Productos Únicos</p>
            </div>
            <div>
                <h4>98%</h4>
                <p>Satisfacción</p>
            </div>
            <div>
                <h4>4.9★</h4>
                <p>Valoración</p>
            </div>

        </section>

        <Footer/>
    </div>
  )
}

export default SobreNosotros