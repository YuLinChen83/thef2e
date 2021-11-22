import clsx from 'clsx';
import { useState, useEffect, memo, SetStateAction, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import useStore from '../../store';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents
} from 'react-leaflet';
import { LatLngTuple, Icon, Point, IconOptions, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Select from '../../components/Select';
import CardInfo from '../../components/CardInfo';
import BicycleDefaultIcon from '../../../assets/icons/bicycle-default.svg';
import BicycleSelectedIcon from '../../../assets/icons/bicycle-selected.svg';
import BicycleOffServiceIcon from '../../../assets/icons/bicycle-offService.svg';

const BICYCLE_SVG = (icon: string) =>
  new Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    popupAnchor: [0, 0],
    iconSize: new Point(44, 44)
  });

const StationMarker = ({ stations }: { stations: any[] }) => {
  const {
    currentSelectedStation = { stationUID: '' },
    setCurrentSelectedStation
  } = useStore();

  const icon = (stationUID: string): Icon<IconOptions> | DivIcon | undefined =>
    BICYCLE_SVG(
      currentSelectedStation?.stationUID === stationUID
        ? BicycleSelectedIcon
        : BicycleDefaultIcon
    );

  console.log('stations: ', stations);
  return (
    <>
      {stations.map((item) => (
        <Marker
          key={item.stationUID}
          position={[item.positionLat, item.positionLon]}
          icon={icon(item.stationUID)}
          title={item.stationName}
          alt={item.stationName}
          eventHandlers={{
            click: () => setCurrentSelectedStation(item)
          }}
        ></Marker>
      ))}
    </>
  );
};

type MainMapType = {
  position: any;
  stations: any[];
};

// { latitude, longitude }
const MainMap = ({
  position: [latitude, longitude] = [],
  stations
}: MainMapType) => {
  const [position, setPosition] = useState<LatLngTuple>([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={position}
      zoom={16}
      // whenCreated={setMap}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=${process.env.NX_MAP_TOKEN}`}
      />
      <Marker position={position} title="目前的位置" alt="目前的位置"></Marker>
      <StationMarker stations={stations} />
    </MapContainer>
  );
};

const Homepage = ({ coords }: { coords?: any }) => {
  // const { city, town } = useParams();
  const [filter, setFilter] = useState({ city: '', town: '' });
  const {
    currentPosition,
    setCurrentPosition,
    cities,
    getCities,
    stations,
    getStations,
    currentSelectedStation
  } = useStore();

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (coords) setCurrentPosition([coords.latitude, coords.longitude]);
  }, [coords]);

  useEffect(() => {
    if (currentPosition) getStations();
  }, [currentPosition]);

  return (
    <div className="w-full h-full">
      <div>
        <span className="text-base">搜尋結果</span>
        <span className="text-black-400 text-xs ml-3">{`共 ${50} 筆`}</span>
      </div>
      <div className="mt-2 mb-4">
        <Select
          placeholder="縣市"
          value={filter.city}
          onChange={(value) => setFilter({ ...filter, city: value })}
          options={cities.map(({ CityName, City }) => ({
            text: CityName,
            value: City
          }))}
        />
        <Select
          placeholder="鄉鎮區"
          className="ml-1"
          value={filter.town}
          onChange={(value) => setFilter({ ...filter, town: value })}
          options={[]}
        />
      </div>
      <div className="w-full h-full inline-flex gap-5">
        <div className="w-1/3 flex flex-col gap-4">
          {stations.map((item: any) => (
            <CardInfo key={item.stationUID} type="path" {...item} />
          ))}
        </div>
        <div className="w-2/3 h-5/6 relative">
          {currentPosition === null ? (
            'Loading'
          ) : (
            <MainMap position={currentPosition} stations={stations} />
          )}
          {currentSelectedStation && (
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-999">
              <CardInfo type="station" {...currentSelectedStation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default geolocated()(Homepage);
