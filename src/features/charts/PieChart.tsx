'use client';

import * as d3 from 'd3';
import React, { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';

import type { NavigateType } from '@/hooks/useNavigate';
import { ErrorMessage, WaitSpinner } from '@/ui';
import { remToPx } from '@/utils';

import { useChartUpdate } from '.';
import type { CategoriesQueryResultType } from './types';
import { addTooltip, CHART_STYLES } from './utilsCharts';

const PIE_COLORS = [
  '#ef4444', // red-500
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#eab308', // yellow-500
  '#0d9488', // teal-500
  '#8b5cf6', // violet-500
  '#f97316', // orange-500
  '#ec4899', // pink-500
  '#0ea5e9', // cyan-500
];
const PIE_TOOLTIP_HUE = 200;

type PieSliceDatum = {
  category: string;
  count: number;
  percent: number;
};

function updateChart({
  current,
  navigate,
  pieData,
  name,
}: {
  current: SVGSVGElement;
  navigate: NavigateType;
  pieData: PieSliceDatum[];
  name: string;
}) {
  const svgBase = d3.select(current);
  svgBase.selectAll('*').remove();

  if (pieData.length === 0) {
    return;
  }

  const parentNode = current.parentNode as HTMLElement;
  invariant(parentNode);
  const parentWidth = parentNode.clientWidth;
  const parentHeight = parentNode.clientHeight;
  svgBase.attr('width', parentWidth).attr('height', parentHeight);

  const margin = remToPx(2);
  const widthChart = parentWidth - margin * 2;
  const heightChart = parentHeight - margin * 2;
  const radius = Math.min(widthChart, heightChart) / 2 - margin;
  const innerRadius = radius * 0.5;
  const cx = margin + widthChart / 2;
  const cy = margin + heightChart / 2;

  const colorScale = d3.scaleOrdinal<string>().range(PIE_COLORS);
  const pie = d3
    .pie<PieSliceDatum>()
    .value((d) => d.count)
    .sort(null);
  const dataReady = pie(pieData);
  const arc = d3
    .arc<d3.PieArcDatum<PieSliceDatum>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(10);

  const pieGroup = svgBase
    .append('g')
    .attr('transform', `translate(${cx},${cy})`);

  // Arcs (wrapped in <a> when navigate is used)
  const slice = pieGroup
    .selectAll('a')
    .data(dataReady)
    .join('a')
    .attr('href', (d) => navigate.getURL(d.data.category))
    .attr('class', 'hover:opacity-80');

  slice
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.data.category))
    .attr('class', 'stroke-panel')
    .style('stroke-width', '5px')
    .attr('data-category', (d) => d.data.category)
    .attr('data-count', (d) => String(d.data.count));

  // Arc labels (percent)
  pieGroup
    .selectAll('.pie-label')
    .data(dataReady)
    .join('text')
    .attr('class', 'pie-label text-xs')
    .style('pointer-events', 'none')
    .text((d) => d.data.percent + '%')
    .attr('transform', (d) => {
      const pos = arc.centroid(d);
      return `translate(${pos[0]},${pos[1]})`;
    })
    .style('text-anchor', 'middle')
    .style('fill', 'white');

  // Center text (total count)
  const total = pieData.reduce((sum, d) => sum + d.count, 0);
  pieGroup
    .append('text')
    .text(total)
    .attr('x', 0)
    .attr('y', 0)
    .style('font-size', '1.5rem')
    .style('font-weight', '900')
    .style('text-anchor', 'middle')
    .style('fill', 'var(--chart-text-color)');
  pieGroup
    .append('text')
    .text(name)
    .attr('x', 0)
    .attr('y', 20)
    .style('font-size', '8pt')
    .style('text-anchor', 'middle')
    .style('fill', 'var(--chart-text-color)');

  addTooltip({ svg: svgBase, hue: PIE_TOOLTIP_HUE, name });
}

const PieChart: React.FC<{
  name: 'orders' | 'customers' | 'suppliers';
  navigate: NavigateType;
  categoriesQueryResult: CategoriesQueryResultType;
}> = ({
  name,
  navigate,
  categoriesQueryResult: { categories, error, isLoading, refetch },
}) => {
  const { itemsPerCategoryCount, pieData } = useMemo(() => {
    const itemsPerCategoryCount = new Map<string, number>();
    categories?.forEach((category) => {
      if (!category) return;
      const count = (itemsPerCategoryCount.get(category) || 0) + 1;
      itemsPerCategoryCount.set(category, count);
    });
    const sortedArray = [...itemsPerCategoryCount]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
    const total = sortedArray.reduce((sum, d) => sum + d.count, 0);
    const pieData: PieSliceDatum[] = sortedArray.map((d) => ({
      ...d,
      percent: total > 0 ? Math.round((d.count / total) * 100) : 0,
    }));
    return { itemsPerCategoryCount, pieData };
  }, [categories]);

  const updateCallback = useCallback(
    ({ current }: { current: SVGSVGElement }) => {
      updateChart({
        current,
        navigate,
        pieData,
        name,
      });
    },
    [navigate, pieData, name],
  );

  const { ref } = useChartUpdate(updateCallback);

  const legendItems = useMemo(() => {
    const sorted = [...itemsPerCategoryCount]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(sorted.map((d) => d.category))
      .range(PIE_COLORS);
    return sorted.map(({ category, count }) => ({
      category,
      count,
      color: colorScale(category),
    }));
  }, [itemsPerCategoryCount]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    return <svg ref={ref} className="absolute" />;
  };

  return (
    <div
      className="flex min-w-full flex-col items-center justify-stretch gap-2 sm:min-w-150"
      style={CHART_STYLES}
    >
      <div className="relative flex min-h-100 min-w-full flex-col justify-stretch">
        {getContent()}
      </div>
      <div className="grid max-w-150 auto-rows-fr grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {legendItems.map((item) => (
          <a
            key={item.category}
            href={navigate.getURL(item.category)}
            className="flex items-center gap-2 text-xs hover:opacity-80"
          >
            <span
              className="inline-block h-4 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-(--chart-text-color)">{item.category}</span>
            <span className="ml-auto font-bold">{item.count}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
