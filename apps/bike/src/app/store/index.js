import create from 'zustand';
import axios from 'axios';
import { getAuthorizationHeader } from '../utils'

const { Authorization, "X-Date": xDate } = getAuthorizationHeader();
axios.defaults.headers.common['Authorization'] = Authorization;
axios.defaults.headers.common['X-Date'] = xDate;
// getAuthorizationHeader

const useStore = create((set, get) => ({
  currentPosition: null,
  cities: [],
  stations: [],
  currentSelectedStation: null,
  setCurrentPosition: (position) => { set({ currentPosition: position }) },
  setCurrentSelectedStation: (station) => { set({ currentSelectedStation: station }) },
  getCities: async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City'
      });
      set({ cities: data });
    }
    catch (error) {
      console.error(error.message);
      set({ cities: [] });
    }
  },
  getStations: async (city) => {
    let stationUrl, availabilityUrl = '';
    if (city) {
      stationUrl = `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?$top=30`;
      availabilityUrl = `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}?$top=30`;
    } else {
      const [latitude, longitude] = get().currentPosition;
      stationUrl = `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`;
      availabilityUrl = `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$top=30&$spatialFilter=nearby(${latitude},${longitude},500)`;
    }

    try {
      const { data: stationData } = await axios({
        method: 'get',
        url: stationUrl
      });
      const { data: availabilityData } = await axios({
        method: 'get',
        url: availabilityUrl
      });

      const result = stationData.map((stationItem) => {
        const { AvailableRentBikes, AvailableReturnBikes, UpdateTime: updateTime } = availabilityData.find(availableItem => availableItem.stationUID === stationItem.stationUID);
        const [bikeVersion, stationName] = stationItem.StationName.Zh_tw.split('_');
        return {
          stationUID: stationItem.StationUID,
          stationPosition: stationItem.StationPosition,
          stationName: stationName,
          stationAddr: stationItem.StationAddress.Zh_tw,
          availableRentBikes: AvailableRentBikes,
          availableReturnBikes: AvailableReturnBikes,
          positionLat: stationItem.StationPosition.PositionLat,
          positionLon: stationItem.StationPosition.PositionLon,
          bikeVersion,
          updateTime
        };
      });

      set({ stations: result });
    }
    catch (error) {
      console.error(error.message);
      set({ stations: [] });
    }
  },


}));

export default useStore;