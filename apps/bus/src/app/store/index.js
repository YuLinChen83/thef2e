import create from 'zustand';
import axios from 'axios';
import { getAuthorizationHeader } from '../utils'

const { Authorization, "X-Date": xDate } = getAuthorizationHeader();
axios.defaults.headers.common['Authorization'] = Authorization;
axios.defaults.headers.common['X-Date'] = xDate;

const useStore = create((set, get) => ({
  searchCity: 'Taipei',
  busRoutes: [],
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
  getBusRoutes: async () => {
    const searchCity = get().searchCity;
    if (!searchCity) {
      return;
    }
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${searchCity}?&$format=JSON`
      });
      set({ busRoutes: data });
    }
    catch (error) {
      console.error(error.message);
      set({ busRoutes: [] });
    }
  },
}));

export default useStore;