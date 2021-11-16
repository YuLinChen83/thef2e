import styled from 'styled-components';
import './index.css';
import StatusIcon from './components/StatusIcon';

const StyledApp = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans TC', sans-serif;
`;

export function App() {
  return (
    <StyledApp className="text-black text-xl">
      Bike 嗨嗨嗨
      <StatusIcon />
    </StyledApp>
  );
}

export default App;
