import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import PortfolioList from './components/portfolioList/PortfolioList';
import PieChart from './components/pieChart/PieChart';
import LineChart from './components/lineChart/LineChart';
import SignIn from './components/signIn/SignIn';

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
    <Router>
      <StyledAppDiv className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              // eslint-disable-next-line
              <Container maxWidth="lg">
                <StyledPrimaryDiv>
                  <PortfolioList />
                  <PieChart />
                </StyledPrimaryDiv>
                <StyledSecondaryDiv>
                  <LineChart />
                </StyledSecondaryDiv>
              </Container>
            }
          />
        </Routes>
      </StyledAppDiv>
    </Router>
  );
}

export default App;
