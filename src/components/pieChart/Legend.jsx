import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const StyledLegendDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: ${(props) => `${props.width}px`};
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;

const StyledColorCircle = styled.div`
  border-radius: 100%;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.fill};
  margin: auto 0.5rem auto 1rem;
`;

const StyledText = styled.p`
  font-size: 0.7rem;
  margin: auto;
`;

const Legend = ({ data, color, visible, width }) => (
  <AnimatePresence>
    {visible && (
      <StyledLegendDiv
        width={width}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 1.5 } }}
        exit={{ opacity: 0 }}
      >
        {data.map((d) => (
          <StyledTextRow key={d.data.stock}>
            <StyledColorCircle fill={color(d)} />
            <StyledText>{d.data.stock}</StyledText>
          </StyledTextRow>
        ))}
      </StyledLegendDiv>
    )}
  </AnimatePresence>
);

export default Legend;
