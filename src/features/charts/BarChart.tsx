'use client';

import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';

import { useQueryCustomers, useQueryOrders, useQuerySuppliers } from '@/net';
import { ErrorMessage, PanelBasic, Typography, WaitSpinner } from '@/ui';

import { addTooltip } from './utilsCharts';

function updateChart({
  current,
  width,
  height,
  itemsPerCountryCount,
  maxItemsCountPerCountry,
  hue,
  name,
  navigate,
}: {
  current: SVGSVGElement;
  width: number;
  height: number;
  itemsPerCountryCount: Map<string, number>;
  maxItemsCountPerCountry: number;
  hue: number;
  name: string;
  navigate: (path: string) => void;
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

  const margin = { top: 30, right: 30, bottom: 100, left: 60 };
  const widthChart = width - margin.left - margin.right;
  const heightChart = height - margin.top - margin.bottom;
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

  // Remove fractional ticks
  const ticksOld = y.ticks;
  y.ticks = function () {
    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-explicit-any
    const result = ticksOld.apply(this, arguments as any);
    return result.filter((value) => Number.isInteger(value));
  };

  svg
    .append('g')
    .style('color', 'var(--chart-text-color)')
    .call(d3.axisLeft(y))
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
    .attr('class', 'hover:cursor-pointer hover:opacity-50')
    .attr('data-country', (d) => d.country)
    .attr('data-count', (d) => d.count)
    .attr('x', function (d) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return x(d.country) as any;
    })
    .attr('y', function (d) {
      return y(d.count);
    })
    .attr('width', x.bandwidth())
    .attr('height', function (d) {
      return Math.max(0, heightChart - y(d.count));
    })
    .attr('fill', `hsla(${hue}, 100%, 70%, 50%)`)
    .attr('stroke', `hsla(${hue}, 100%, 50%, 50%)`)
    .attr('stroke-width', 2);

  addTooltip({ svg: svgBase, hue, name, navigate });
}

const BarChart: React.FC<{
  name: string;
  hue: number;
  queryResult: {
    countries: string[] | undefined;
    error: Error | null;
    isLoading: boolean;
    refetch: () => void;
  };
}> = ({ name, hue, queryResult: { countries, error, isLoading, refetch } }) => {
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

  // Navigate
  const router = useRouter();
  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  // SVG chart
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    function update() {
      const current = ref.current;
      if (!current) return;
      const parentNode = current.parentNode as HTMLElement;
      if (!parentNode) return;
      const width = parentNode.clientWidth;
      const height = parentNode.clientHeight;
      d3.select(current).attr('width', width).attr('height', height);
      updateChart({
        current,
        width,
        height,
        itemsPerCountryCount,
        maxItemsCountPerCountry,
        hue,
        name,
        navigate,
      });
    }
    update();

    const element = ref.current?.parentElement;
    const resizeObserver = new ResizeObserver(update);
    if (element) resizeObserver.observe(element);
    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, [itemsPerCountryCount, maxItemsCountPerCountry, hue, name, navigate]);

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    return <svg ref={ref} className="absolute" />;
  };

  return (
    <PanelBasic className="flex flex-col items-center">
      <Typography.Header2>
        Distribution of count of <u>{name}</u> by countries
      </Typography.Header2>
      <div
        className="min-h-100 min-w-full sm:min-w-150 relative"
        style={{ '--chart-text-color': '#888' } as React.CSSProperties}
      >
        {getContent()}
      </div>
    </PanelBasic>
  );
};

export const CustomersBarChart: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryCustomers();

  const countries = useMemo(() => {
    return data?.map((dataItem) => dataItem.country);
  }, [data]);

  return (
    <BarChart
      name="customers"
      hue={30}
      queryResult={{ countries, error, isLoading, refetch }}
    />
  );
};

export const OrdersBarChart: React.FC = () => {
  const { data, error, isLoading, refetch } = useQueryOrders();

  const countries = useMemo(() => {
    return data?.map((dataItem) => dataItem.shipCountry);
  }, [data]);

  return (
    <BarChart
      name="orders"
      hue={216}
      queryResult={{ countries, error, isLoading, refetch }}
    />
  );
};

export const SuppliersBarChart: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuerySuppliers();

  const countries = useMemo(() => {
    return data?.map((dataItem) => dataItem.country);
  }, [data]);

  return (
    <BarChart
      name="suppliers"
      hue={120}
      queryResult={{ countries, error, isLoading, refetch }}
    />
  );
};
