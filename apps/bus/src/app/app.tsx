import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import RealtimeBus from './pages/RealtimeBus';
import BusSchedule from './pages/BusSchedule';
import MyFavorite from './pages/MyFavorite';
import NearbyBusStop from './pages/NearbyBusStop';
import Homepage from './pages/Homepage';
import Bg from '../assets/images/bg-pc.jpg';
import './index.css';

const queryClient = new QueryClient();

const StyledApp = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200;300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Nunito+Sans:wght@200;300;400;600;700;800;900&family=Pacifico&family=Roboto:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans TC', sans-serif;
  .crimson {
    font-family: 'Crimson Pro', serif;
  }
  .nunito {
    font-family: 'Nunito Sans', sans-serif;
  }
  .pacifico {
    font-family: 'Pacifico', cursive;
  }
  .roboto {
    font-family: 'Roboto', sans-serif;
  }
`;

export function App() {
  return (
    <StyledApp className="h-full w-full flex flex-col">
      <div
        className="absolute h-full w-full bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url('${Bg}')`,
          zIndex: -1,
          clipPath: 'ellipse(70vw 70vw at 50% -26vw)'
        }}
      />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/realtime" element={<RealtimeBus />} />
              <Route path="/nearby" element={<NearbyBusStop />} />
              <Route path="/schedule" element={<BusSchedule />} />
              <Route path="/favorite" element={<MyFavorite />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </StyledApp>
  );
}

export default App;
