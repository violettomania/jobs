import { NavLink } from 'react-router-dom';

import links from '../util/links';

const NavLinks = () => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon: IconComponent } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            end
          >
            <span className='icon'>
              <IconComponent />
            </span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
