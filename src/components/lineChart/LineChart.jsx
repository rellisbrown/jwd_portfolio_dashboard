import React from 'react';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import { axisBottom, axisRight } from 'd3';
import { useEffect, useRef } from 'react';
import Data from './mockdata.json.json';

export default function LineChart() {
  const svgRef = useRef(null);

  const height = 200;
  const width = 550;
  const margin = { right: 150, bottom: 150, top: 20, left: 150 };

  
  const lineData = Data.map((item, index) => [
    index,
    parseFloat(item['trees-cut']),
  ]);

  const yScale = d3.scaleLinear().domain([10, 100]).range([0, height]);

  const xScale = d3.scaleBand().domain(d3.range(Data.length)).range([0, width]);

  const xAxis = axisBottom(xScale)
    .tickFormat((i) => Data[i].year)
    .tickSizeOuter(10);

 
  const yAxis = axisRight(yScale)
    .tickFormat((i) => `${i}k`)
    .tickSizeInner(1200);

  useEffect(() => {
 
    d3.select(svgRef.current)
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.right - 1210}, ${margin.top})`);

    d3.select(svgRef.current)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.right + 10},${height + margin.top})`
      )
      .call(xAxis);

    d3.select(svgRef.current)
      .append('g')
      .selectAll('dot')
      .data(lineData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d[0]))
      .attr('cy', (d) => yScale(d[1]))
      .attr('r', 5)
      .attr('transform', `translate(${margin.right + 50}, ${margin.top})`)
      .style('fill', 'pink');

    d3.select(svgRef.current)
      .append('path')
      .datum(lineData)
      .attr('class', 'line')
      .attr('transform', `translate(${margin.right + 50}, ${margin.top})`)
      .attr(
        'd',
        d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
      )

      .style('fill', 'none')
      .style('stroke', 'pink')
      .style('stroke-width', '5');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', width / 100)
      .attr('y', 20)
      .attr('text-anchor', 'start')
      .attr('font-size', '2.00rem')
      .attr('font-weight', '1000')
      .text('deforestation');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', width / 2 + 50)
      .attr('y', height + 90)
      .attr('text-anchor', 'start')
      .attr('font-size', '1rem')
      .attr('font-weight', '400')
      .text('year');

    d3.select(svgRef.current)
      .append('text')
      .attr('x', 21)
      .attr('y', height / 2)
      .attr('text-anchor', 'start')
      .attr('font-size', '1.2rem')
      .attr('font-weight', '200')
      .text('no. of trees ');
  }, [lineData, margin.top, margin.right, xAxis, yAxis, xScale, yScale]);

  return (
    <div>
      <svg
        width={width + margin.left}
        height={height + margin.bottom}
        ref={svgRef}
      />
    </div>
  );
}
