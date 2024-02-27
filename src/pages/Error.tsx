import { Link } from 'react-router-dom';

import notFound from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={notFound} alt='not found' />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/landing'>back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;