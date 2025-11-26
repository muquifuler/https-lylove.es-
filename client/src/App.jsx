// GENERAL
import './App.css'
import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './stores/useUserStore'
import { useTranslation } from 'react-i18next'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Details = lazy(() => import('./pages/Details'))

const Cart = lazy(() => import('./pages/Cart'))
const Success = lazy(() => import('./pages/Success'))
const Cancel = lazy(() => import('./pages/Cancel'))

const Contacto = lazy(() => import('./pages/legales/Contacto'))
const PoliticaDeCookies = lazy(() => import('./pages/legales/PoliticaDeCookies'))
const PreguntasFrecuentes = lazy(() => import('./pages/legales/PreguntasFrecuentes'))
const SobreNosotros = lazy(() => import('./pages/legales/SobreNosotros'))

const NotFound = lazy(() => import('./pages/NotFound'))

const Admin = lazy(() => import('./pages/Admin'))

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    } else {
      const browserLang = navigator.language.startsWith('en') ? 'en' : navigator.language.startsWith('fr') ? 'fr' : 'es';
      i18n.changeLanguage(browserLang);
      localStorage.setItem('lang', browserLang);
    }
  }, [i18n]);

  useEffect(() => {
      useUserStore.getState().fetchProducts();
  }, []);

  const userLang = navigator.language.startsWith('en') ? 'en' : navigator.language.startsWith('fr') ? 'fr' : 'es';

  return (
    <Router>
      <main className="App">
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/" element={<Navigate to={`/home`} replace />} />
            <Route path="/cancel" element={<Navigate to={`/home`} replace />} />

            <Route path="/home" element={<Home lang={userLang} />} />
            <Route path="/cart" element={<Cart lang={userLang} />} />
            <Route path="/product/:id" element={<Details lang={userLang} />} />

            <Route path="/success" element={<Success lang={userLang} />} />
            <Route path="/cancel" element={<Cancel lang={userLang} />} />

            <Route path="/contact" element={<Contacto lang={userLang} />} />
            <Route path="/cookies" element={<PoliticaDeCookies lang={userLang} />} />
            <Route path="/faq" element={<PreguntasFrecuentes lang={userLang} />} />
            <Route path="/about-us" element={<SobreNosotros lang={userLang} />} />

            {/* 🚨 Not Found */}
            <Route path="*" element={<NotFound />} />

            <Route path="/admin" element={<Admin lang={userLang} />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}

export default App
