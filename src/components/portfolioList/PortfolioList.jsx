import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { DataContext } from '../../utils/DataContext';

const PortfolioList = () => {
  const contextValue = useContext(DataContext);
  console.log(contextValue.portfolioDetails);

  return (
    <div style={{ width: '50%', height: '500px' }}>
      List
      <Button
        onClick={() =>
          contextValue.handlePortfolioDetailsQuantityChange('IBM', 400)
        }
      >
        Test
      </Button>
    </div>
  );
};

export default PortfolioList;
