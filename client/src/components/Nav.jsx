
import './styles/Nav.css'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

function Nav() {

  const cart = useUserStore(state => state.cart)
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <div className='Nav'>
        <Link to={`/home`} className='logo'>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="Layout:77:16" data-dynamic-content="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              Lylove</p>   
        </Link>
        
        <Link to={'/cart'} className='cart'>
            {cart.length > 0 && <span>{totalUnits}</span>}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-source-location="Layout:132:18" data-dynamic-content="false"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
        </Link>   
    </div>
  )
}

export default Nav