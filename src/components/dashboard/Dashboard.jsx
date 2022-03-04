import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import PortfolioList from '../portfolioList/PortfolioList';
import PieChart from '../pieChart/PieChart';
import LineChart from '../lineChart/LineChart';
import { DataContext } from '../../utils/DataContext';

const StyledPrimaryDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /*  border: solid 1.5px #686e91;
  border-radius: 10px; */
  margin: 2rem auto 1rem auto;
`;

const StyledPrimaryDivChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledSecondaryDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;

const StyledApiLimitDiv = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 200px);
`;

const StyledApiLimitText = styled.h4`
  display: flex;
  margin: auto;
  color: red;
`;

const StyledTitleDiv = styled.div`
  width: 100%;
  display: flex;
  background-color: #8d2f2f;
`;

const StyledTitleText = styled.h2`
  margin: 0.3rem auto 0.3rem 2rem;
  color: white;
`;

const Dashboard = () => {
  const context = useContext(DataContext);

  if (context.apiLimit) {
    return (
      <StyledApiLimitDiv>
        <StyledApiLimitText>
          Api limit reached... try refreshing in a few seconds
        </StyledApiLimitText>
      </StyledApiLimitDiv>
    );
  }

  return (
    <Container maxWidth="lg">
      <StyledPrimaryDiv>
        <StyledTitleDiv>
          <StyledTitleText>Portfolio Overview</StyledTitleText>
        </StyledTitleDiv>
        <StyledPrimaryDivChartContainer>
          <PortfolioList />
          <PieChart />
        </StyledPrimaryDivChartContainer>
      </StyledPrimaryDiv>
      <StyledSecondaryDiv>
        <StyledTitleDiv style={{ backgroundColor: '#c5c748' }}>
          <StyledTitleText>Equity Performance</StyledTitleText>
        </StyledTitleDiv>
        <LineChart />
      </StyledSecondaryDiv>
    </Container>
  );
};

export default Dashboard;
