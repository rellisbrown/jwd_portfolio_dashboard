import React, { useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { scaleOrdinal, arc, pie } from 'd3';
import useResizeObserver from '../../utils/useResizeObserver';
import { DataContext } from '../../utils/DataContext';

const PieChart = () => {
  const wrapperRef = useRef();
  const dataContext = useContext(DataContext);
  const dimensions = useResizeObserver(wrapperRef);

  if (!dimensions) return <div ref={wrapperRef}>loading...</div>;

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

  console.log(pieData);

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
    '#8aa5dec2',
    '#bb516bc2',
    '#3a7d57c2',
    '#66216bb3',
  ]);

  const pieArc = arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

  const pieGenerator = pie()
    .sort(null)
    .value((d) => d.value);

  const data = pieGenerator(pieData);

  console.log(data);

  return (
    <div
      ref={wrapperRef}
      style={{ width: '50%', height: '400px', display: 'flex' }}
    >
      <svg width={width} height={height} style={{ margin: 'auto' }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {data.map((d) => (
            <g className="arc" key={`a${d.data.stock}`}>
              {/* <text transform={`translate(${pieArc.centroid(d)})`} dy=".35em">
                {d.data.stock}
              </text> */}
              <path d={pieArc(d)} fill={color(d.data.stock)} />
            </g>
          ))}
        </g>
      </svg>
      {data.map((d) => (
        <div
          style={{
            transform: `translate(${pieArc.centroid(d)[0] + width / 2}px, ${
              pieArc.centroid(d)[1] + height / 2
            }px)`,
            position: 'absolute',
          }}
        >
          {d.data.stock}
        </div>
      ))}
    </div>
  );
};

export default PieChart;
