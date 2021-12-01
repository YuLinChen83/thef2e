import create from 'zustand';
import axios from 'axios';
import { getAuthorizationHeader } from '../utils'

const { Authorization, "X-Date": xDate } = getAuthorizationHeader();
axios.defaults.headers.common['Authorization'] = Authorization;
axios.defaults.headers.common['X-Date'] = xDate;

const useStore = create((set) => ({
  favorite: JSON.parse(
    window.localStorage.getItem('favorite') || '{}'
  ),
  setFavorite: (favorite) => {
    window.localStorage.setItem('favorite', JSON.stringify(favorite));
    set({ favorite });
  },
  busRoutes: [],
  getBusRoutes: async (city) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?&$format=JSON`
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