import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import News from './pages/News';
import Contact from './pages/Contact';
import Homepage from './pages/Homepage';
import './index.css';

const queryClient = new QueryClient();

const StyledApp = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans TC', sans-serif;
`;

export function App() {
  return (
    <StyledApp className="text-black text-xl bg-auxiliary-light h-screen overflow-hidden relative">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className="h-full w-full max-w-7xl flex m-auto pt-5">
            <Routes>
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </StyledApp>
  );
}

export default App;
