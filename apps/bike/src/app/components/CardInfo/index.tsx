import clsx from 'clsx';
import Card from '../Card';
import Badge from '../Badge';
import { ReactComponent as ForkKnifeIcon } from '../../../assets/icons/fork-knife.svg';
import { ReactComponent as CameraIcon } from '../../../assets/icons/camera.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/map.svg';
import dateFormat from 'dateformat';

export type Prop = {
  type: 'path' | 'station';
  stationName: string;
  stationAddr: string;
  availableRentBikes: number;
  availableReturnBikes: number;
  updateTime: 'string';
};

const CardInfo = ({
  type,
  stationName,
  stationAddr,
  availableRentBikes,
  availableReturnBikes,
  updateTime
}: Prop) => (
  <Card>
    <div className="inline-flex justify-between border-b border-black-100 mb-3 pb-3">
      <div className="flex flex-col justify-center w-full overflow-hidden">
        <h3 className="text-base font-bold flex items-center justify-between pb-1">
          {stationName}
        </h3>
        {type === 'station' && (
          <div className="inline-flex items-center py-2">
            <MapIcon className="text-primary w-5 h-5 mr-1 flex-none" />
            <span className="text-xs overflow-ellipsis overflow-hidden">
              {stationAddr}
            </span>
          </div>
        )}
      </div>
      {type === 'path' ? (
        <div className="flex items-center justify-center">
          <span className="py-1 px-3 rounded-full font-normal text-xs text-black-400 bg-black-100">
            雙向
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-end text-primary text-xs w-48 flex-none">
          <button className="inline-flex items-center px-2 py-3 rounded border border-primary">
            <ForkKnifeIcon className="w-5 h-5 mr-1" />
            觀光餐飲
          </button>
          <button className="inline-flex items-center px-2 py-3 rounded border border-primary ml-2">
            <CameraIcon className="w-5 h-5 mr-1" />
            景點資訊
          </button>
        </div>
      )}
    </div>
    {type === 'path' ? (
      <div className="inline-flex w-full">
        <div className="flex flex-col justify-between flex-grow">
          <div className="flex items-center">
            <div className="text-xs font-semibold text-primary w-6 h-6 border-2 border-primary rounded-xl mr-2 flex items-center justify-center">
              起
            </div>
            <div>蘇府王爺廟（中正路旁）</div>
          </div>
          <div className="flex items-center flex-grow mt-2">
            <div className="text-xs font-semibold text-primary w-6 h-6 border-2 border-primary rounded-xl mr-2 flex items-center justify-center">
              迄
            </div>
            <div>中正路一段 87 巷</div>
          </div>
        </div>
        <div className="w-14 flex flex-col items-center justify-center">
          <div className="text-black-400 text-xs">全長</div>
          <div className="text-primary font-semibold mt-2">0.50公里</div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Badge type="success">正常營運</Badge>
          <Badge>YouBike 1.0</Badge>
        </div>
        <div className="bg-primary-10 my-3 rounded-md h-16 text-base flex items-center justify-between">
          <div className="text-black-400 inline-flex justify-center w-1/2">
            可租
            <div className="w-7 text-center font-semibold text-black">
              {availableRentBikes}
            </div>
          </div>
          <div className="border-r border-black-200 h-10" />
          <div className="text-black-400 inline-flex justify-center w-1/2">
            可還
            <div className="w-7 text-center font-semibold text-black">
              {availableReturnBikes}
            </div>
          </div>
        </div>
        <p className="text-black-300 text-xs">
          Last update: {dateFormat(new Date(updateTime), 'yyyy-mm-dd HH:MM:ss')}
        </p>
      </div>
    )}
  </Card>
);

export default CardInfo;
