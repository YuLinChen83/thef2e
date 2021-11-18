import clsx from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as BicycleIcon } from '../../../assets/icons/bicycle.svg';
import { ReactComponent as ListIcon } from '../../../assets/icons/list.svg';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const [mobileShowMenu, setMobileShowMenu] = useState(false);

  return (
    <div className="w-full h-16 flex justify-center shadow-header sticky top-0 px-3 bg-white">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <BicycleIcon className="text-black w-14 mr-3" />
        <h1 className="flex-grow leading-5">
          台灣<span className="text-primary">自行車</span>旅遊網
          <br />
          <span className="text-xs">Taiwan Bike</span>
        </h1>
        {/* <ListIcon className="md:hidden" /> */}
        <div className="inline-flex gap-10">
          {[
            ['找路線', '/'],
            ['最新消息', '/news'],
            ['聯絡我們', '/contact']
          ].map(([title, path]) => (
            <a
              key={title}
              className={clsx(
                pathname === path && 'text-primary font-semibold'
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
    </div>
  );
};

export default Header;
