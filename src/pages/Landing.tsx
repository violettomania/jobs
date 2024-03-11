import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/LandingPage';
import LogoImage from '../components/svg/LogoImage';
import MainImage from '../components/svg/MainImage';

const version = process.env.npm_package_version;

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Link to='/'>
            <LogoImage />
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
          <span className='img main-img'>
            <MainImage />
          </span>
        </div>
        <div className='version-info'>
          <p>Version: {version}</p>
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
