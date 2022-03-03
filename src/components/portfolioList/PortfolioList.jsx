import React, { useContext } from 'react';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { DataContext } from '../../utils/DataContext';
import PortfolioListItem from './PortfolioListItem';

const PortfolioList = () => {
  const contextValue = useContext(DataContext);
  console.log('loading', contextValue.loading);
  console.log('apilimit', contextValue.apiLimit);
  console.log(contextValue.portfolioDetails);

  let totalPortfolioValue = 0;
  for (const item of contextValue.portfolioDetails) {
    totalPortfolioValue += item.quantity * item.latestClose;
  }

  const listData = contextValue.portfolioDetails.map((item) => {
    const weeklyChange =
      ((item.data[item.data.length - 1]?.close -
        item.data[item.data.length - 2]?.close) /
        item.data[item.data.length - 2]?.close) *
      100;
    return {
      stock: item.stock,
      latestClose: item.latestClose,
      quantity: item.quantity,
      weeklyChange,
      value: item.quantity * item.latestClose,
      proportion: (item.quantity * item.latestClose) / totalPortfolioValue,
    };
  });

  console.log(listData);

  return (
    <Card style={{ width: '50%', height: '500px' }}>
      <List>
        <ListItem>
          <ListItemText>Stock</ListItemText>
          <ListItemText>Quantity</ListItemText>
          <ListItemText>Latest</ListItemText>
          <ListItemText>Change</ListItemText>
          <ListItemText>Holding Value</ListItemText>
          <ListItemText>Holding %</ListItemText>
        </ListItem>
        {listData.map((item) => (
          <PortfolioListItem key={item.stock} itemData={item} />
        ))}
      </List>
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
    </Card>
  );
};

export default PortfolioList;
