import clsx from 'clsx';
import { useState, useEffect, memo, SetStateAction, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import useStore from '../../store';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Select from '../../components/Select';
import { LatLngTuple } from 'leaflet';

// const position = [51.505, -0.09];

// const StationMarker = ({ nearby, type, searchParam }) => {
//   const { data, loading } = useHttp('', 'bike', nearby);
//   const bike_data = data.filter((station) => station.ServiceType === type);

//   return (
//     <>
//       {bike_data.map((item) => (
//         <Marker
//           key={item.StationUID}
//           position={[
//             item.StationPosition.PositionLat,
//             item.StationPosition.PositionLon
//           ]}
//           icon={
//             item.AvailableRentBikes === 0 && searchParam === 'rent'
//               ? emptyStationSVG
//               : item.AvailableReturnBikes === 0 && searchParam === 'return'
//               ? emptyStationSVG
//               : searchParam === 'rent'
//               ? rentStationSVG
//               : returnStationSVG
//           }
//           title={item.StationName.Zh_tw}
//           alt={item.StationName.Zh_tw}
//         >
//           <Tooltip
//             offset={[-1, -8]}
//             direction="center"
//             opacity={1}
//             permanent
//             className={item.AvailableReturnBikes === 0 ? 'text-dark' : null}
//           >
//             {searchParam === 'rent'
//               ? item.AvailableRentBikes.toString()
//               : item.AvailableReturnBikes.toString()}
//           </Tooltip>
//         </Marker>
//       ))}
//     </>
//   );
// };

type MainMapType = {
  position: any;
  zoom: number;
};

// { latitude, longitude }
const MainMap = ({
  position: [latitude, longitude] = [],
  zoom
}: MainMapType) => {
  const [position, setPosition] = useState<LatLngTuple>([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={position}
      zoom={zoom}
      // whenCreated={setMap}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=${process.env.NX_MAP_TOKEN}`}
      />
      <Marker position={position} title="目前的位置" alt="目前的位置"></Marker>
      {/* <StationMarker nearby={nearby} type={type} searchParam={searchParam} /> */}
    </MapContainer>
  );
};

const Homepage = ({ coords }: { coords?: any }) => {
  // const { city, town } = useParams();
  const [filter, setFilter] = useState({ city: '', town: '' });
  const getCities = useStore((state) => state.getCities);
  const cities = useStore((state) => state.cities);

  useEffect(() => {
    getCities();
  }, []);
  useEffect(() => {
    console.log('cities: ', cities);
  }, [cities]);

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
        <div className="w-1/3">Card list</div>
        <div className="w-2/3 h-5/6">
          {coords === null ? (
            'Loading'
          ) : (
            <MainMap position={[coords.latitude, coords.longitude]} zoom={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default geolocated()(Homepage);
