'use client';

import * as d3 from 'd3';
import React, { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';

import { useNavigate } from '@/hooks';
import { ErrorMessage, WaitSpinner } from '@/ui';

import { useChartUpdate } from '.';
import type { CountriesQueryResultType } from './types';
import { addTooltip, CHART_STYLES } from './utilsCharts';

function updateChart({
  current,
  navigate,
  itemsPerCountryCount,
  maxItemsCountPerCountry,
  hue,
  name,
}: {
  current: SVGSVGElement;
  navigate: (path: string) => void;
  itemsPerCountryCount: Map<string, number>;
  maxItemsCountPerCountry: number;
  hue: number;
  name: string;
}) {
  // Prepare data
  const itemsPerCountryCountArray = [...itemsPerCountryCount]
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Draw the map
  const svgBase = d3.select(current);
  svgBase.selectAll('*').remove();

  const parentNode = current.parentNode as HTMLElement;
  invariant(parentNode);
  const parentWidth = parentNode.clientWidth;
  const parentHeight = parentNode.clientHeight;
  svgBase.attr('width', parentWidth).attr('height', parentHeight);

  const margin = { top: 30, right: 30, bottom: 100, left: 60 };
  const widthChart = parentWidth - margin.left - margin.right;
  const heightChart = parentHeight - margin.top - margin.bottom;
  const svg = svgBase
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // X axis
  const x = d3
    .scaleBand()
    .range([0, widthChart])
    .domain(
      itemsPerCountryCountArray.map(function (d) {
        return d.country;
      }),
    )
    .padding(0.2);

  svg
    .append('g')
    .attr('transform', `translate(0, ${5 + heightChart})`)
    .style('color', 'var(--chart-text-color)')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll('text')
    .attr('transform', 'translate(-10, 0) rotate(-45)')
    .style('font-size', '9pt')
    .style('text-anchor', 'end');

  // Y axis
  const y = d3
    .scaleLinear()
    .domain([0, maxItemsCountPerCountry])
    .range([heightChart, 0])
    .nice();

  svg
    .append('g')
    .style('color', 'var(--chart-text-color)')
    .call(
      d3
        .axisLeft(y)
        .tickValues(y.ticks().filter((d) => Number.isInteger(d)))
        .tickFormat(d3.format('d')),
    )
    .selectAll('text')
    .attr('fill', 'var(--chart-text-color)')
    .style('font-size', '9pt');

  // Y grid
  svg
    .selectAll('.whatever-grid')
    .data(y.ticks())
    .join('line')
    .attr('x1', 0)
    .attr('y1', (d: number) => Math.round(y(d)) + 0.5)
    .attr('x2', widthChart)
    .attr('y2', (d: number) => Math.round(y(d)) + 0.5)
    .style('stroke', 'var(--chart-text-color)')
    .style('stroke-dasharray', '2 3')
    .style('opacity', 0.3);

  // Bars
  svg
    .selectAll('.whatever')
    .data(itemsPerCountryCountArray)
    .join('rect')
    .attr('class', 'hover:opacity-50')
    .attr('data-country', (d) => d.country)
    .attr('data-count', (d) => d.count)
    .attr('x', function (d) {
      const result = x(d.country);
      invariant(result);
      return result;
    })
    .attr('y', function (d) {
      return y(d.count);
    })
    .attr('width', x.bandwidth())
    .attr('height', function (d) {
      return Math.max(0, heightChart - y(d.count));
    })
    .attr('fill', `hsl(${hue} 100% 70% / 0.5)`)
    .attr('stroke', `hsl(${hue} 100% 50% / 0.5)`)
    .attr('stroke-width', 2);

  addTooltip({ svg: svgBase, hue, name, navigate });
}

const BarChart: React.FC<{
  name: 'orders' | 'customers' | 'suppliers';
  countriesQueryResult: CountriesQueryResultType;
  hue: number;
}> = ({
  name,
  hue,
  countriesQueryResult: { countries, error, isLoading, refetch },
}) => {
  // Prepare data for the chart
  const { itemsPerCountryCount, maxItemsCountPerCountry } = useMemo(() => {
    const itemsPerCountryCount = new Map<string, number>();
    let maxItemsCountPerCountry = 0;
    countries?.forEach((country) => {
      const count = (itemsPerCountryCount.get(country) || 0) + 1;
      maxItemsCountPerCountry = Math.max(maxItemsCountPerCountry, count);
      itemsPerCountryCount.set(country, count);
    });
    return { itemsPerCountryCount, maxItemsCountPerCountry };
  }, [countries]);

  const navigate = useNavigate();

  const updateCallback = useCallback(
    ({ current }: { current: SVGSVGElement }) => {
      updateChart({
        current,
        navigate,
        itemsPerCountryCount,
        maxItemsCountPerCountry,
        hue,
        name,
      });
    },
    [itemsPerCountryCount, maxItemsCountPerCountry, hue, name, navigate],
  );

  const { ref } = useChartUpdate(updateCallback);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    return <svg ref={ref} className="absolute" />;
  };

  return (
    <div
      className="relative min-h-100 min-w-full sm:min-w-150 flex justify-center"
      style={CHART_STYLES}
    >
      {getContent()}
    </div>
  );
};

export default BarChart;
