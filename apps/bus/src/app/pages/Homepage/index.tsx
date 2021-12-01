import { useNavigate } from 'react-router-dom';
import { routeConfig } from './../../constants';
import Logo from '../../../assets/images/logo-light.png';
import Bg from '../../../assets/images/bg-pc.png';
import { ReactComponent as BusIcon } from '../../../assets/icons/bus.svg';
import { ReactComponent as MarkIcon } from '../../../assets/icons/mark.svg';
import { ReactComponent as TicketIcon } from '../../../assets/icons/ticket.svg';
import { ReactComponent as FavoriteIcon } from '../../../assets/icons/heart.svg';

const iconMap = {
  公車動態: BusIcon,
  附近站點: MarkIcon,
  班表查詢: TicketIcon,
  我的收藏: FavoriteIcon
};

type MenuItemProps = {
  text: keyof typeof iconMap;
  path: string;
  onClick: (e: { preventDefault: () => void }) => void;
};
const MenuItem = ({ text, path, onClick }: MenuItemProps) => {
  const MenuIcon = iconMap[text];
  return (
    <a key={text} className="flex flex-col w-25" href={path} onClick={onClick}>
      <MenuIcon className="text-icon text-main-blue hover:text-main-blue-dark transition-colors" />
      <div className="pt-3 text-center">{text}</div>
    </a>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col text-white ">
      <div
        className="absolute top-0 w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${Bg}')`,
          zIndex: -1,
          height: 'calc(100% - 140px)'
        }}
      />
      <div className="h-2/3 flex flex-col items-center justify-center">
        <img
          src={Logo}
          alt="logo"
          className="w-home-logo filter drop-shadow-logo"
        />
        <div className="text-2xl font-light tracking-loose filter drop-shadow-xl">
          全台公車動態時刻查詢網
        </div>
      </div>
      <div className="h-1/3 flex items-center m-auto">
        <div className="inline-flex justify-center gap-20 text-main text-xl">
          {routeConfig.map(([text, path]) => (
            <MenuItem
              key={text}
              text={text as keyof typeof iconMap}
              path={path}
              onClick={(e: { preventDefault: () => void }) => {
                e.preventDefault();
                navigate(path);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
