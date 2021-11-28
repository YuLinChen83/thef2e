import { useNavigate, useLocation } from 'react-router-dom';
import { routeConfig } from './../../constants';
import Logo from '../../../assets/images/logo-light.png';
import clsx from 'clsx';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 px-12 flex justify-between items-center text-xl text-white z-10">
      <img
        src={Logo}
        alt="logo"
        className="w-36 absolute left-14 cursor-pointer"
        onClick={() => navigate('/')}
      />
      <div className="m-auto inline-flex gap-12">
        {routeConfig.map(([title, path]) => (
          <a
            key={title}
            className={clsx(
              'flex items-center',
              pathname === path && 'border-t border-b border-white'
            )}
            href={path}
            onClick={(e) => {
              e.preventDefault();
              navigate(path);
            }}
          >
            {title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;
