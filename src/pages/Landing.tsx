import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { resetUser } from '../state/slices/userSlice';
import { RootState } from '../state/store/store';

const Landing = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // prevent logout on page refresh
  useEffect(() => {
    if (!user) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userObj = JSON.parse(userString);
        dispatch(resetUser(userObj));
        navigate('/');
      }
    }
  }, [dispatch, navigate, user]);

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
