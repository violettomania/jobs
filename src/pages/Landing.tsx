import { Link } from 'react-router-dom';

import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { useRehydrateOnPageRefresh } from '../hooks/useRehydrateOnPageRefresh';

const Landing = () => {
  useRehydrateOnPageRefresh();

  return (
    <Wrapper>
      <main>
        <nav>
          <Link to='/landing'>
            <Logo />
          </Link>
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Crucifix narwhal street art asymmetrical, humblebrag tote bag
              pop-up fixie raclette taxidermy craft beer. Brunch bitters synth,
              VHS crucifix heirloom meggings bicycle rights
            </p>
            <Link to='/login' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
