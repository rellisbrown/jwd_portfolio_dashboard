import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { axisLeft, axisTop, axisBottom } from 'd3';
import { DataContext } from '../../utils/DataContext';
import useResizeObserver from '../../utils/useResizeObserver';

export default function LineChart() {
  const contextValue = useContext(DataContext);
  const svgRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const margin = { right: 50, bottom: 100, top: 50, left: 100 };
  const outerHeight = dimensions?.height;
  const outerWidth = dimensions?.width;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  const innerWidth = outerWidth - margin.left - margin.right;

  const lineData = contextValue.portfolioDetails[0].data.map((item) => ({
    date: item.date,
    value: item.close,
  }));

  const yValues = lineData.map((item) => item.value);
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(yValues) - 10, d3.max(yValues)])
    .range([innerHeight, 0]);

  const xValues = lineData.map((item) => item.date);
  const xScale = d3
    .scaleTime()
    .domain([d3.min(xValues), d3.max(xValues)])
    .range([0, innerWidth]);

  const xAxis = axisBottom(xScale)
    .tickFormat((i) => i.getFullYear())
    .tickSizeOuter(10)
    .tickPadding(5);

  const yAxis = axisLeft(yScale).tickFormat((i) => `$${i}`);

  useEffect(() => {
    d3.select(svgRef.current).select('.x-axis').remove();
    d3.select(svgRef.current).select('.y-axis').remove();
    d3.select(svgRef.current).select('.title').remove();
    d3.select(svgRef.current).selectAll('g').remove();
    d3.select(svgRef.current).select('.line').remove();
    d3.select(svgRef.current).select('.x-label').remove();
    d3.select(svgRef.current).select('.y-label').remove();

    d3.select(svgRef.current)
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'y-axis');

    d3.select(svgRef.current)
      .append('g')
      .call(xAxis)
      .attr(
        'transform',
        `translate(${margin.left},${innerHeight + margin.top})`
      )
      .attr('class', 'x-axis');

    d3.select(svgRef.current)
      .append('g')
      .selectAll('dot')
      .data(lineData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.date))
      .attr('cy', (d) => yScale(d.value))
      .attr('r', 2)
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
      .style('stroke-width', '2');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 30)
      .attr('text-anchor', 'start')
      .attr('font-size', '2.00rem')
      .attr('font-weight', '1000')
      .attr('class', 'title')
      .text('Stock price over time');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', innerWidth / 2 + margin.left)
      .attr('y', innerHeight + 90)
      .attr('text-anchor', 'start')
      .attr('font-size', '1rem')
      .attr('font-weight', '400')
      .attr('class', 'y-label')
      .text('Date');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', 21)
      .attr('y', innerHeight / 2 + margin.top)
      .attr('text-anchor', 'start')
      .attr('font-size', '1.2rem')
      .attr('font-weight', '200')
      .attr('class', 'x-label')
      .text('Price');
  }, [
    lineData,
    margin.top,
    margin.left,
    margin.right,
    xAxis,
    yAxis,
    xScale,
    yScale,
    innerHeight,
    innerWidth,
  ]);

  if (!dimensions) return <div ref={wrapperRef}>loading...</div>;

  return (
    <div style={{ width: '100%', height: '500px' }} ref={wrapperRef}>
      <svg width={outerWidth} height={outerHeight} ref={svgRef} />
    </div>
  );
}
