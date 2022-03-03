import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { DataContext } from '../../utils/DataContext';

const PortfolioList = () => {
  const contextValue = useContext(DataContext);
  console.log('loading', contextValue.loading);
  console.log('apilimit', contextValue.apiLimit);

  return (
    <div style={{ width: '50%', height: '500px' }}>
      List
      <Button
        onClick={() =>
          contextValue.handlePortfolioDetailsQuantityChange(
            'IBM',
            contextValue.portfolioDetails[0].quantity + 50
          )
        }
      >
        Test
      </Button>
    </div>
  );
};

export default PortfolioList;
