import './styles/Contacto.css'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Contacto() {

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    function validateForm() {
        let newErrors = {};

        if (!form.name.trim()) newErrors.name = true;
        if (!form.email.trim()) newErrors.email = true;
        if (!form.subject.trim()) newErrors.subject = true;
        if (!form.msg.trim()) newErrors.msg = true;

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function sendForm() {
        setSuccess(false); 

        if (!validateForm()) {
            return;
        }

        await fetch(import.meta.env.VITE_SERVER + 'api/send-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ form })
        });

        setSuccess(true);

        setForm({ name: "", email: "", subject: "", msg: "" });
        setErrors({});
    }

  return (
    <div className='Contacto'>
        <Nav/>

        <section className='one'>
            <div className='tag'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                <span>Estamos aquí para ti</span>
            </div>

            <h1>Contáctanos</h1>
            <p>¿Tienes alguna pregunta? Nos encantaría ayudarte a encontrar el regalo perfecto.</p>
        </section>

        <section className='two'>
            <div className='card'>
                <h2>Envíanos un Mensaje</h2>

                {success && (
                    <div className="success-msg">
                        ✔ Mensaje enviado correctamente
                    </div>
                )}

                <div className='flex'>
                    <div>
                        <p>Nombre</p>
                        <input 
                            type="text" 
                            placeholder='Tu nombre' 
                            value={form.name}
                            className={errors.name ? "error" : ""}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <p>Email</p>
                        <input 
                            type="text" 
                            placeholder='tu@email.com' 
                            value={form.email}
                            className={errors.email ? "error" : ""}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className='col'>
                    <p>Asunto</p>
                    <input 
                        type="text" 
                        placeholder='¿En qué podemos ayudarte?' 
                        value={form.subject}
                        className={errors.subject ? "error" : ""}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                </div>

                <div className='col'>
                    <p>Mensaje</p>
                    <textarea 
                        placeholder='Cuéntanos más sobre tu consulta...' 
                        value={form.msg}
                        className={errors.msg ? "error" : ""}
                        onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    />
                </div>

                <button onClick={sendForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
                    Enviar Mensaje
                </button>
            </div>    
        </section>

        <Footer/>
    </div>
  )
}

export default Contacto;
