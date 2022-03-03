import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { axisLeft, axisTop } from 'd3';
import { DataContext } from '../../utils/DataContext';

export default function LineChart() {
  const contextValue = useContext(DataContext);
  const svgRef = useRef(null);

  console.log(contextValue.portfolioDetails);
  const innerHeight = 300;
  const innerWidth = 550;
  const margin = { right: 150, bottom: 150, top: 50, left: 150 };
  const outerHeight = innerHeight + margin.top + margin.bottom;
  const outerWidth = innerWidth + margin.left + margin.right;

  const lineData = contextValue.portfolioDetails[0].data.map((item) => ({
    date: item.date,
    value: item.close,
  }));
  console.log(contextValue.portfolioDetails);
  const yValues = lineData.map((item) => item.value);
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(yValues), d3.max(yValues)])
    .range([0, outerWidth]);

  const xValues = lineData.map((item) => item.date);
  const xScale = d3
    .scaleTime()
    .domain([d3.min(xValues), d3.max(xValues)])
    .range([0, innerWidth]);

  const xAxis = axisTop(xScale)
    .tickFormat((i) => i.getFullYear())
    .tickSizeOuter(10)
    .tickPadding(5);

  const yAxis = axisLeft(yScale).tickFormat((i) => `${i}%`);

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
      .attr('cx', (d) => xScale(d.date))
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
          .x((d) => xScale(d.date))
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
      .text('stock');

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
      .text('stock ');
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
