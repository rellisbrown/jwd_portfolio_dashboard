import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
  useAnimation,
} from 'framer-motion';
import styled from '@emotion/styled';

const StyledPath = styled(motion.path)`
  opacity: 0.8;
  transition: all 200ms ease;
  &:hover {
    stroke-width: 7;
    opacity: 1;
  }
`;

const PieArc = ({
  fill,
  path,
  stock,
  latestClose,
  value,
  finish,
  onMouseMove,
  onMouseOut,
}) => {
  const pathRef = useRef(null);
  const animationController = useAnimation();

  const handleAnimationEnd = useCallback(() => {
    if (pathRef.current) {
      pathRef.current.removeAttribute('stroke-dasharray');
      pathRef.current.removeAttribute('stroke-dashoffset');
    }
  }, [pathRef]);
  const handleOnHover = useCallback(
    (e) => {
      if (onMouseMove) {
        onMouseMove(e, {
          stock,
          value,
          latestClose,
          fill,
        });
      }
    },
    [fill, stock, latestClose, value, onMouseMove]
  );

  useEffect(() => {
    if (finish) {
      finish.current = animationController.start({
        pathLength: [0, 1, 1],
        fill: ['#fff', '#fff', fill],
      });
    }
  }, [animationController, finish, fill]);
  return (
    <g>
      <StyledPath
        d={path}
        ref={pathRef}
        stroke={fill}
        custom={fill}
        onMouseMove={handleOnHover}
        onMouseOut={onMouseOut}
        onAnimationComplete={handleAnimationEnd}
        initial={{ fill: 'transparent', pathLength: 0 }}
        transition={{ type: 'tween', duration: 2 }}
        animate={animationController}
      />
    </g>
  );
};

export default PieArc;
