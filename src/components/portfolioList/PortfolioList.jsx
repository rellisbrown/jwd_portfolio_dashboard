import React, { useContext } from 'react';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SellIcon from '@mui/icons-material/Sell';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import { DataContext } from '../../utils/DataContext';
import PortfolioListItem from './PortfolioListItem';

const StyledListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  padding-bottom: 0;
  background-color: #21295d;
  color: white;
  box-shadow: 2px 1px 2px 0px #888888;
`;

const StyledListItemText = styled(ListItemText)`
  display: flex;
  span {
    font-size: 0.8rem;
    display: flex;
    margin: auto;
  }
`;

const StyledListItemSubText = styled(ListItemText)`
  display: flex;
  span {
    font-size: 0.6rem;
    color: white;
    display: flex;
    margin: 0 auto 0 auto;
  }
`;

const StyledTrendingUpIcon = styled(TrendingUpIcon)`
  fill: white;
`;

const StyledDonutSmallIcon = styled(DonutSmallIcon)`
  fill: white;
`;

const StyledAccountBalanceIcon = styled(AccountBalanceIcon)`
  fill: white;
`;
const StyledSellIcon = styled(SellIcon)`
  fill: white;
`;

const StyledAddButton = styled(Button)`
  background-color: #619779;
  min-width: 0;
`;

const StyledSkeleton = styled(Skeleton)`
  width: 30px;
`;

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
    <Card
      style={{
        width: '50%',
        margin: '2rem 3rem auto 2rem',
        height: 'fit-content',
      }}
    >
      <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        <StyledListItem>
          <StyledListItemText>Stock</StyledListItemText>
          <StyledListItemText>Quantity</StyledListItemText>
          <StyledListItemText>
            <StyledSellIcon />
          </StyledListItemText>
          <StyledListItemText>
            <StyledTrendingUpIcon />
          </StyledListItemText>
          <StyledListItemText>
            <StyledAccountBalanceIcon />
          </StyledListItemText>
          <StyledListItemText>
            <StyledDonutSmallIcon />
          </StyledListItemText>
          <StyledListItemText>
            <StyledAddButton
              size="small"
              variant="contained"
              endIcon={<AddIcon />}
            />
          </StyledListItemText>
        </StyledListItem>
        <StyledListItem
          style={{
            paddingTop: '0px',
            backgroundColor: '#21295dad',
            boxShadow: '2px 1px 2px 0px #888888',
          }}
        >
          <StyledListItemSubText />
          <StyledListItemSubText />
          <StyledListItemSubText>($)</StyledListItemSubText>
          <StyledListItemSubText>(%)</StyledListItemSubText>
          <StyledListItemSubText>($)</StyledListItemSubText>
          <StyledListItemSubText>(%)</StyledListItemSubText>
        </StyledListItem>
        {listData.map((item) => (
          <PortfolioListItem
            key={item.stock}
            itemData={item}
            loading={contextValue.loading}
          />
        ))}
        <StyledListItem style={{ paddingTop: '0px' }}>
          <StyledListItemText />
          <StyledListItemText />
          <StyledListItemText />
          <StyledListItemText />
          <StyledListItemText>
            {contextValue.loading ? (
              <StyledSkeleton />
            ) : (
              totalPortfolioValue.toLocaleString('en-UK', {
                maximumSignificantDigits: 6,
              })
            )}
          </StyledListItemText>
          <StyledListItemText />
          <StyledListItemText />
        </StyledListItem>
      </List>
    </Card>
  );
};

export default PortfolioList;
