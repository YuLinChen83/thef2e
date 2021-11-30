import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
import { cities } from '../../constants';
import { ReactComponent as RightArrowIcon } from '../../../assets/icons/right-arrow.svg';
import { ReactComponent as DownIcon } from '../../../assets/icons/down.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';
import DefaultImage from '../../../assets/images/default.png';

const RealtimeBus = () => {
  const navigate = useNavigate();
  const { getBusRoutes } = useStore();
  const [cityKey, setCityKey] = useState('');
  const [routeKey, setRouteKey] = useState('');

  useEffect(() => {
    getBusRoutes();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div
        className="bg-main-bg w-full h-64 absolute top-0 rounded-b-3xl"
        style={{ zIndex: -1 }}
      />
      <div className="inline-flex items-center text-white text-sm px-12">
        <a
          href="/"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          首頁
        </a>
        <RightArrowIcon className="h-3 px-2" />
        <a
          href="/realtime"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            navigate('/realtime');
          }}
        >
          公車動態
        </a>
      </div>
      <div className="w-3/4 m-auto flex flex-col pt-6">
        {/* <div className="w-3/4 flex flex-col"> */}
        {/* <div className="flex flex-col justify-center"> */}
        <p className="text-main-blue mb-3">*選擇縣市有助於您更快找到路線</p>
        <div className="inline-flex gap-5">
          <label htmlFor="city" className="flex-1 relative">
            <input
              list="cities"
              placeholder="請選擇縣市或手動輸入關鍵字"
              className="w-full bg-gray-light py-3 px-4 placeholder-gray rounded-xl"
              value={cityKey}
              onChange={(e) => setCityKey(e.target.value)}
            />
            <DownIcon className="absolute w-6 top-5 right-1" />
            <datalist id="cities" className="text-base text-main">
              {cities.map((item) => (
                <option key={item.CityName} value={item.CityName} />
              ))}
            </datalist>
          </label>
          <label htmlFor="number" className="flex-1 relative">
            <input
              type="text"
              placeholder="請選擇路線或手動輸入關鍵字"
              className="w-full bg-gray-light py-3 px-4 placeholder-gray rounded-xl"
              value={routeKey}
              onChange={(e) => setRouteKey(e.target.value)}
            />
            {routeKey ? (
              <CrossIcon
                className="absolute w-3 top-5 right-3 cursor-pointer"
                onClick={() => setRouteKey('')}
              />
            ) : (
              <SearchIcon className="absolute w-6 top-3 right-3" />
            )}
          </label>
        </div>
      </div>
      <div className="flex-1 min-w-max w-3/4 m-auto inline-flex gap-5 justify-center mt-20 mb-12">
        <div className="flex-1 flex flex-col rounded-2xl shadow-card overflow-hidden">
          <div className="bg-main-bg text-white text-xl h-11 flex justify-center items-center">
            搜尋結果
          </div>
          <div className="flex-1 flex items-center justify-center text-base">
            <div className="text-secondary flex flex-col items-center">
              <img src={DefaultImage} alt="search default" className="pb-3" />
              尋找您的公車路線
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-max">
          <div className="btns w-full py-9 px-6 inline-flex rounded-2xl shadow-card text-xl justify-center">
            <div className="grid grid-cols-2 grid-rows-4 gap-x-2 gap-y-4">
              <button className="bg-red text-white rounded-lg">紅</button>
              <button className="bg-blue text-white rounded-lg">藍</button>
              <button className="bg-brown text-white rounded-lg">棕</button>
              <button className="bg-green text-white rounded-lg">綠</button>
              <button className="bg-yellow text-white rounded-lg">黃</button>
              <button className="bg-orange text-white rounded-lg">橘</button>
              <button className="rounded-lg border border-main">F</button>
              <button className="bg-gray-dark text-white rounded-lg">
                更多
              </button>
            </div>
            <div className="pl-2 grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-4">
              {[...[...new Array(9).keys()].map((n) => n + 1), 'C', 0, 'x'].map(
                (i) => (
                  <button
                    key={i}
                    className="bg-gray-light2 text-main rounded-lg"
                  >
                    {i}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default RealtimeBus;
