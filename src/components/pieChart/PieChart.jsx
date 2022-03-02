import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import { scaleOrdinal, arc, pie } from 'd3';
import { useAnimation } from 'framer-motion';
import useResizeObserver from '../../utils/useResizeObserver';
import { DataContext } from '../../utils/DataContext';
import PieArc from './PieArc';
import Tooltip from './Tooltip';

const StyledLoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyledCircularProgress = styled(CircularProgress)`
  margin: auto;
`;

const PieChart = () => {
  const wrapperRef = useRef();
  const dataContext = useContext(DataContext);
  const dimensions = useResizeObserver(wrapperRef);

  const pieData = dataContext.portfolioDetails.map((item) => ({
    stock: item.stock,
    quantity: item.quantity,
    latestDate: item.latestDate,
    latestClose: item.latestClose,
    value: item.quantity * item.latestClose,
  }));

  let totalPortfolioValue = 0;
  for (const item of pieData) {
    totalPortfolioValue += item.value;
  }

  const margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  const width = dimensions?.width - margin.left - margin.right;
  const height = dimensions?.height - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;

  const color = scaleOrdinal().range([
    '#8aa5de',
    '#bb516b',
    '#3a7d57',
    '#66216b',
  ]);

  const createArc = arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 50)
    .cornerRadius(2)
    .padAngle(Math.PI / 120);

  const pieGenerator = pie()
    .sort(null)
    .value((d) => d.value);

  const data = pieGenerator(pieData);

  const [tooltipData, setTooltipData] = useState({
    visible: false,
  });

  const handleTooltipShow = useCallback(
    (e, d) => {
      if (wrapperRef.current) {
        const bounding = wrapperRef.current.getBoundingClientRect();
        setTooltipData({
          visible: true,
          stock: d.stock,
          latestClose: d.latestClose,
          value: d.value,
          proportion: d.value / totalPortfolioValue,
          left: e.clientX - bounding.x,
          top: e.clientY - bounding.y,
          fill: d.fill,
        });
      }
    },
    [setTooltipData, totalPortfolioValue]
  );
  const handleTooltipHide = useCallback(
    () => setTooltipData({ ...tooltipData, visible: false }),
    [setTooltipData, tooltipData]
  );

  const archFinish = useRef(null);
  const boxController = useAnimation();

  useEffect(() => {
    async function animate() {
      await archFinish.current;
      await boxController.start({
        opacity: 1,
        x: 0,
      });
    }

    animate();
  }, [archFinish, boxController]);

  if (!dimensions) return <div ref={wrapperRef}>loading...</div>;

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '50%',
        height: '400px',
        display: 'flex',
        position: 'relative',
      }}
    >
      {dataContext.loading ? (
        <StyledLoadingDiv>
          <StyledCircularProgress />
        </StyledLoadingDiv>
      ) : (
        <>
          <svg width={width} height={height} style={{ margin: 'auto' }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
              {data.map((d) => (
                <PieArc
                  key={`arc-${d.data.stock}`}
                  fill={color(d)}
                  path={createArc(d)}
                  stock={d.data.stock}
                  latestClose={d.data.latestClose}
                  value={d.data.value}
                  finish={archFinish}
                  onMouseMove={handleTooltipShow}
                  onMouseOut={handleTooltipHide}
                />
              ))}
            </g>
          </svg>
          {/* {data.map((d) => (
            <div
              key={`text-${d.data.stock}`}
              style={{
                transform: `translate(${
                  createArc.centroid(d)[0] + width / 2
                }px, ${createArc.centroid(d)[1] + height / 2}px)`,
                position: 'absolute',
              }}
            >
              {d.data.stock}
            </div>
          ))} */}
          <Tooltip tooltipData={tooltipData} />
        </>
      )}
    </div>
  );
};

export default PieChart;
