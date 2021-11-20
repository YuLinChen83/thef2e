import create from 'zustand';
import axios from 'axios';
import { getAuthorizationHeader } from '../utils'

const { Authorization, "X-Date": xDate } = getAuthorizationHeader();
axios.defaults.headers.common['Authorization'] = Authorization;
axios.defaults.headers.common['X-Date'] = xDate;
// getAuthorizationHeader

const useStore = create((set) => ({
  cities: [],
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
  }
}));

export default useStore;