import React from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';

const StyledCard = styled(Card)`
  position: absolute;
  top: ${(props) => `${props.top + 20}px`};
  left: ${(props) => `${props.left + 20}px`};
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: row;
`;

const StyledColorCircle = styled.div`
  border-radius: 100%;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.fill};
  margin: auto 1rem auto 1rem;
`;

const StyledTooltipTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const StyledTooltipTextLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTooltipLabel = styled.p`
  font-size: 0.7rem;
  width: 110px;
  margin: 0;
  padding: 0.2rem;
  padding-top: 0;
  font-weight: 600;
`;

const StyledTooltipText = styled.p`
  font-size: 0.7rem;
  margin: 0;
  padding: 0.2rem;
  padding-top: 0;
  padding-right: 1rem;
`;

const Tooltip = ({ tooltipData }) => (
  <StyledCard
    visible={tooltipData.visible}
    top={tooltipData.top}
    left={tooltipData.left}
  >
    <StyledColorCircle fill={tooltipData.fill} />
    <StyledTooltipTextDiv>
      <StyledTooltipTextLine>
        <StyledTooltipLabel>Stock:</StyledTooltipLabel>
        <StyledTooltipText>{tooltipData.stock}</StyledTooltipText>
      </StyledTooltipTextLine>
      <StyledTooltipTextLine>
        <StyledTooltipLabel>Current Price:</StyledTooltipLabel>
        <StyledTooltipText>
          $
          {tooltipData.latestClose?.toLocaleString('en-UK', {
            maximumSignificantDigits: 4,
          })}
        </StyledTooltipText>
      </StyledTooltipTextLine>
      <StyledTooltipTextLine>
        <StyledTooltipLabel>Holding Value:</StyledTooltipLabel>
        <StyledTooltipText>
          $
          {tooltipData.value?.toLocaleString('en-UK', {
            maximumSignificantDigits: 4,
          })}
        </StyledTooltipText>
      </StyledTooltipTextLine>
      <StyledTooltipTextLine>
        <StyledTooltipLabel style={{ paddingBottom: 0 }}>
          Holding Proportion:
        </StyledTooltipLabel>
        <StyledTooltipText style={{ paddingBottom: 0 }}>
          {(tooltipData.proportion * 100).toFixed(2)}%
        </StyledTooltipText>
      </StyledTooltipTextLine>
    </StyledTooltipTextDiv>
  </StyledCard>
);

export default Tooltip;
