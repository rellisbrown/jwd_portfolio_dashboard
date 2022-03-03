import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styled from '@emotion/styled';

const StyledListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const PortfolioListItem = ({ itemData }) => (
  <StyledListItem>
    <ListItemText>{itemData.stock}</ListItemText>
    <ListItemText>{itemData.quantity}</ListItemText>
    <ListItemText>
      {itemData.latestClose.toLocaleString('en-UK', {
        maximumSignificantDigits: 4,
      })}
    </ListItemText>
    <ListItemText>{itemData.weeklyChange.toFixed(2)}</ListItemText>
    <ListItemText>
      {itemData.value.toLocaleString('en-UK', {
        maximumSignificantDigits: 4,
      })}
    </ListItemText>
    <ListItemText>{(itemData.proportion * 100).toFixed(1)}</ListItemText>
  </StyledListItem>
);

export default PortfolioListItem;
