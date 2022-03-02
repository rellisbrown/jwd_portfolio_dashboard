import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import PortfolioList from '../portfolioList/PortfolioList';
import PieChart from '../pieChart/PieChart';
import LineChart from '../lineChart/LineChart';
import { DataContext } from '../../utils/DataContext';

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
        <PortfolioList />
        <PieChart />
      </StyledPrimaryDiv>
      <StyledSecondaryDiv>
        <LineChart />
      </StyledSecondaryDiv>
    </Container>
  );
};

export default Dashboard;
