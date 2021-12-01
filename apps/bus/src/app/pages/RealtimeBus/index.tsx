import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
import { cities } from '../../constants';
import { ReactComponent as RightArrowIcon } from '../../../assets/icons/right-arrow.svg';
import { ReactComponent as DownIcon } from '../../../assets/icons/down.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';
import { ReactComponent as ArrowsIcon } from '../../../assets/icons/arrows.svg';
import { ReactComponent as HeartOutlineIcon } from '../../../assets/icons/heart-outline.svg';
import { ReactComponent as HeartFilledIcon } from '../../../assets/icons/heart-filled.svg';
import DefaultImage from '../../../assets/images/default.png';

const RealtimeBus = () => {
  const navigate = useNavigate();
  const { busRoutes, getBusRoutes, favorite, setFavorite } = useStore();
  const [searchCity, setSearchCity] = useState('');
  const [routeKey, setRouteKey] = useState('');
  const [filteredBusRoutes, setFilteredBusRoutes] = useState(busRoutes);

  useEffect(() => {
    let searchCityValue;
    if (
      searchCity &&
      (searchCityValue = cities.find((city) => city.name === searchCity)?.value)
    ) {
      getBusRoutes(searchCityValue);
    }
  }, [getBusRoutes, searchCity]);

  useEffect(() => {
    setFilteredBusRoutes(
      busRoutes.filter(
        (item: any) => item.RouteName.Zh_tw.indexOf(routeKey) > -1
      )
    );
  }, [busRoutes, routeKey]);

  const handleToggleFavorite = (uid: string) => {
    const newFavorite = { ...favorite };
    if (newFavorite[uid]) delete newFavorite[uid];
    else newFavorite[uid] = true;
    setFavorite(newFavorite);
  };

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
        <p className="text-main-blue mb-3">*選擇縣市有助於您更快找到路線</p>
        <div className="inline-flex gap-5">
          <label htmlFor="city" className="flex-1 relative">
            <input
              list="cities"
              placeholder="請選擇縣市或手動輸入關鍵字"
              className="w-full bg-gray-light py-3 px-4 placeholder-gray rounded-xl"
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <DownIcon className="absolute w-6 top-5 right-1" />
            <datalist id="cities" className="text-base text-main">
              {cities.map((item) => (
                <option key={item.name} value={item.name} />
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
        <div
          className="flex-1 flex flex-col rounded-2xl shadow-card overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 400px)' }}
        >
          <div className="flex-none bg-main-bg text-white text-xl h-11 flex justify-center items-center">
            搜尋結果
          </div>
          {busRoutes.length ? (
            <>
              <div className="flex items-center justify-end mx-9">
                <span className="text-main text-xs my-5 pr-2">
                  僅顯示提供無障礙車輛之路線
                  {/* TODO: 但沒可判斷這的欄位？ */}
                </span>
                <label className="switch">
                  <input
                    type="checkbox"
                    title="sw"
                    className="opacity-0 w-0 h-0"
                  />
                  <span />
                </label>
              </div>
              <div className="flex-none h-full overflow-scroll">
                <div className="flex flex-col">
                  {filteredBusRoutes.map((item: any) => (
                    <div
                      key={item.RouteUID}
                      className="mb-4 mx-9 rounded-xl shadow-route py-4 px-3"
                    >
                      <div className="flex justify-between">
                        <div className="text-secondary-red text-xl">
                          {item.RouteName.Zh_tw}
                        </div>
                        <div>
                          {favorite[item.RouteUID] ? (
                            <HeartFilledIcon
                              className="cursor-pointer"
                              onClick={() =>
                                handleToggleFavorite(item.RouteUID)
                              }
                            />
                          ) : (
                            <HeartOutlineIcon
                              className="cursor-pointer"
                              onClick={() =>
                                handleToggleFavorite(item.RouteUID)
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="text-main flex items-center text-xs">
                          {item.DepartureStopNameZh}
                          <ArrowsIcon className="mx-2" />
                          {item.DestinationStopNameZh}
                        </div>
                        <div className="text-secondary-blue text-xs">
                          {item.Operators[0]?.OperatorName.Zh_tw}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-base">
              <div className="text-secondary flex flex-col items-center">
                <img src={DefaultImage} alt="search default" className="pb-3" />
                尋找您的公車路線
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-max">
          <div className="btns w-full py-9 px-6 inline-flex rounded-2xl shadow-card text-xl justify-center">
            <div className="grid grid-cols-2 grid-rows-4 gap-x-2 gap-y-4">
              <button
                className="bg-red text-white rounded-lg"
                onClick={() => setRouteKey('')}
              >
                紅
              </button>
              <button
                className="bg-blue text-white rounded-lg"
                onClick={() => setRouteKey('藍')}
              >
                藍
              </button>
              <button
                className="bg-brown text-white rounded-lg"
                onClick={() => setRouteKey('棕')}
              >
                棕
              </button>
              <button
                className="bg-green text-white rounded-lg"
                onClick={() => setRouteKey('綠')}
              >
                綠
              </button>
              <button
                className="bg-yellow text-white rounded-lg"
                onClick={() => setRouteKey('黃')}
              >
                黃
              </button>
              <button
                className="bg-orange text-white rounded-lg"
                onClick={() => setRouteKey('橘')}
              >
                橘
              </button>
              <button
                className="rounded-lg border border-main"
                onClick={() => setRouteKey('F')}
              >
                F
              </button>
              <button className="bg-gray-dark text-white rounded-lg">
                更多
              </button>
            </div>
            <div className="pl-2 grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-4">
              {[...new Array(9).keys()].map((i) => (
                <button
                  key={i}
                  className="bg-gray-light2 text-main rounded-lg"
                  onClick={() => setRouteKey(routeKey + `${i + 1}`)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="bg-gray-light2 text-main rounded-lg"
                onClick={() => setRouteKey('')}
              >
                C
              </button>
              <button
                className="bg-gray-light2 text-main rounded-lg"
                onClick={() => setRouteKey(routeKey + '0')}
              >
                0
              </button>
              <button
                className="bg-gray-light2 text-main rounded-lg"
                onClick={() => setRouteKey(routeKey.slice(0, -1))}
              >
                Ｘ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeBus;
