import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { axisBottom, axisLeft } from 'd3';

import Data from './mockdata.json';

export default function LineChart() {
  const svgRef = useRef(null);

  const innerHeight = 300;
  const innerWidth = 550;
  const margin = { right: 150, bottom: 150, top: 50, left: 150 };
  const outerHeight = innerHeight + margin.top + margin.bottom;
  const outerWidth = innerWidth + margin.left + margin.right;

  const lineData = Data.map((item) => ({
    year: new Date(item.year),
    value: Number(item['trees-cut']),
  }));

  const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

  const xValues = lineData.map((item) => item.year);
  const xScale = d3
    .scaleTime()
    .domain([d3.min(xValues), d3.max(xValues)])
    .range([0, innerWidth]);

  const xAxis = axisBottom(xScale)
    .tickFormat((i) => i.getFullYear())
    .tickSizeOuter(10)
    .tickPadding(5);

  const yAxis = axisLeft(yScale).tickFormat((i) => `${i}k`);
  /*  .tickSizeInner(10); */

  useEffect(() => {
    d3.select(svgRef.current)
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    d3.select(svgRef.current)
      .append('g')
      .call(xAxis)
      .attr(
        'transform',
        `translate(${margin.left},${innerHeight + margin.top})`
      );

    d3.select(svgRef.current)
      .append('g')
      .selectAll('dot')
      .data(lineData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.year))
      .attr('cy', (d) => yScale(d.value))
      .attr('r', 5)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style('fill', 'pink');

    d3.select(svgRef.current)
      .append('path')
      .datum(lineData)
      .attr('class', 'line')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr(
        'd',
        d3
          .line()
          .x((d) => xScale(d.year))
          .y((d) => yScale(d.value))
      )

      .style('fill', 'none')
      .style('stroke', 'pink')
      .style('stroke-width', '5');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 30)
      .attr('text-anchor', 'start')
      .attr('font-size', '2.00rem')
      .attr('font-weight', '1000')
      .text('deforestation');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', innerWidth / 2 + 50)
      .attr('y', innerHeight + 90)
      .attr('text-anchor', 'start')
      .attr('font-size', '1rem')
      .attr('font-weight', '400')
      .text('year');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', 21)
      .attr('y', innerHeight / 2)
      .attr('text-anchor', 'start')
      .attr('font-size', '1.2rem')
      .attr('font-weight', '200')
      .text('no. of trees ');
  }, [
    lineData,
    margin.top,
    margin.left,
    margin.right,
    xAxis,
    yAxis,
    xScale,
    yScale,
  ]);

  return (
    <div>
      <svg width={outerWidth} height={outerHeight} ref={svgRef} />
    </div>
  );
}
