import styled from '@emotion/styled';
import Container from '@mui/material/Container';

import Navigation from './components/navigation/Navigation';
import PortfolioList from './components/portfolioList/PortfolioList';
import PieChart from './components/pieChart/PieChart';
import LineChart from './components/lineChart/LineChart';

import { DataContextProvider } from './utils/DataContext';

const StyledAppDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPrimaryDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledSecondaryDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

function App() {
  return (
    <StyledAppDiv className="App">
      <DataContextProvider>
        <Navigation />
        <Container maxWidth="lg">
          <StyledPrimaryDiv>
            <PortfolioList />
            <PieChart />
          </StyledPrimaryDiv>
          <StyledSecondaryDiv>
            <LineChart />
          </StyledSecondaryDiv>
        </Container>
      </DataContextProvider>
    </StyledAppDiv>
  );
}

export default App;
