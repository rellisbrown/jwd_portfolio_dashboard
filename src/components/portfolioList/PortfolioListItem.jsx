import React, { useState, useContext, useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DataContext } from '../../utils/DataContext';

const StyledListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  :hover {
    background-color: #dfdfef;
  }
`;

const StyledListItemText = styled(ListItemText)`
  display: flex;
  span {
    font-size: 0.8rem;
    display: flex;
    margin: auto;
  }
`;

const StyledListItemTextChange = styled(StyledListItemText)`
  span {
    margin-left: ${(props) => (props.loading ? 'auto' : 0)};
  }
`;

const StyledChangeSpan = styled.span`
  color: ${(props) => props.color};
`;

const StyledUpIcon = styled(ArrowDropUpIcon)`
  fill: #02c502;
`;

const StyledDownIcon = styled(ArrowDropDownIcon)`
  fill: red;
`;

const StyledSkeleton = styled(Skeleton)`
  width: 30px;
`;

const StyledEditButton = styled(Button)`
  min-width: 0;
`;

const StyledDialogContent = styled(DialogContent)`
  &&&&&.MuiDialogContent-root {
    padding: 1rem;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  &&&&&&.MuiDialogTitle-root {
    padding-top: 0.5rem;
    padding-bottom: 0rem;
  }
`;

const PortfolioListItem = ({ itemData, loading }) => {
  const contextValue = useContext(DataContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(itemData.quantity);

  console.log(quantity);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setQuantity(itemData.quantity);
  };

  const handleQuantityChange = useCallback((e) => {
    setQuantity(e.target.value);
  }, []);

  const handleSave = () => {
    contextValue.handlePortfolioDetailsQuantityChange(itemData.stock, quantity);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    contextValue.handlePortfolioDetailsDelete(itemData.stock);
    setDialogOpen(false);
  };

  return (
    <StyledListItem>
      <StyledListItemText>{itemData.stock}</StyledListItemText>
      <StyledListItemText>{itemData.quantity}</StyledListItemText>
      <StyledListItemText>
        {loading ? (
          <StyledSkeleton />
        ) : (
          itemData.latestClose?.toLocaleString('en-UK', {
            maximumSignificantDigits: 6,
          })
        )}
      </StyledListItemText>
      <StyledListItemTextChange loading={loading}>
        {loading ? (
          <StyledSkeleton />
        ) : (
          <>
            {itemData.weeklyChange > 0 ? <StyledUpIcon /> : <StyledDownIcon />}
            <StyledChangeSpan
              color={itemData.weeklyChange > 0 ? '#02c502' : 'red'}
            >
              {itemData.weeklyChange?.toFixed(2)}
            </StyledChangeSpan>
          </>
        )}
      </StyledListItemTextChange>
      <StyledListItemText>
        {loading ? (
          <StyledSkeleton />
        ) : (
          itemData.value?.toLocaleString('en-UK', {
            maximumSignificantDigits: 6,
          })
        )}
      </StyledListItemText>
      <StyledListItemText>
        {loading ? <StyledSkeleton /> : (itemData.proportion * 100)?.toFixed(1)}
      </StyledListItemText>
      <StyledListItemText>
        <StyledEditButton
          onClick={handleDialogOpen}
          size="small"
          variant="outlined"
          endIcon={<EditIcon />}
        />
      </StyledListItemText>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="edit-stock-dialog"
      >
        <StyledDialogTitle id="edit-stock-dialog-title">
          Edit Equity Details
        </StyledDialogTitle>
        <StyledDialogContent>
          <TextField
            type="number"
            size="small"
            id="quantity"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledListItem>
  );
};

export default PortfolioListItem;
