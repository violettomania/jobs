import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/ErrorPage';
import NotFoundImage from '../components/svg/NotFoundImage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div className='error-page'>
        <NotFoundImage />
        <div className='not-found-description'>
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to='/'>back home</Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error;
