'use client';

import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import invariant from 'tiny-invariant';

import { ErrorMessage, WaitSpinner } from '@/ui';

import type { CountriesQueryResultType } from './types';
import { addTooltip, CHART_STYLES } from './utilsCharts';

interface IWorldGeo {
  features: IWorldGeoFeature[];
}

type IWorldGeoFeature = d3.GeoPermissibleObjects & {
  properties: { name: string };
};

function updateChart({
  current,
  width,
  height,
  itemsPerCountryCount,
  maxItemsCountPerCountry,
  hue,
  allowZoom,
  name,
  navigate,
}: {
  current: SVGSVGElement;
  width: number;
  height: number;
  itemsPerCountryCount: Map<string, number>;
  maxItemsCountPerCountry: number;
  hue: number;
  allowZoom: boolean;
  name: string;
  navigate: (path: string) => void;
}) {
  d3.json<IWorldGeo>(
    'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
  ).then(function (data) {
    invariant(data);

    const projection = d3
      .geoNaturalEarth1()
      //.geoAzimuthalEqualArea()
      //.geoCylindricalEqualArea()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2.2, height / 2]);

    // Draw the map
    const svg = d3.select(current);
    svg.selectAll('*').remove();

    const svgGroup = svg.append('g');

    // Background
    svgGroup
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', `hsl(${hue} 100% 50%)`)
      .attr('fill-opacity', 0.1);

    // Countries
    function getCountryName(d: IWorldGeoFeature) {
      const country = d.properties.name;
      if (country === 'England') return 'UK';
      else return country;
    }

    svgGroup
      .append('g')
      .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('class', 'hover:opacity-50 stroke-neutral-500/30')
      .attr('data-country', (d) => getCountryName(d))
      .attr(
        'data-count',
        (d) => itemsPerCountryCount.get(getCountryName(d)) || 'no',
      )
      .attr('fill', function (d) {
        const count = itemsPerCountryCount.get(getCountryName(d));
        if (count) {
          return `hsl(${hue} 100% ${
            80 - Math.round((count / maxItemsCountPerCountry) * 60)
          }%)`;
        } else return 'hsl(0 0% 75%)';
      })
      .attr('d', d3.geoPath().projection(projection));

    // Zoom
    if (allowZoom) {
      const zoomObject = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 4])
        .on('zoom', function (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
          function isFloatSame(a: number, b: number) {
            return Math.abs(a - b) < 1e-5;
          }
          if (
            isFloatSame(event.transform.k, 1) &&
            String(event.transform) !== String(d3.zoomIdentity)
          ) {
            // Reset scale and translate values on scale out
            setTimeout(() => {
              svgGroup.attr('transform', d3.zoomIdentity.toString());
            }, 1e3);
          } else {
            svgGroup.attr('transform', event.transform.toString());
          }
        });

      svg.call(zoomObject);
    }

    // Tooltip
    addTooltip({ svg, hue, name, navigate });
  });
}

const WorldMapChart: React.FC<{
  name: 'orders' | 'customers' | 'suppliers';
  countriesQueryResult: CountriesQueryResultType;
  hue?: number | undefined;
  allowZoom?: boolean | undefined;
}> = ({ name, countriesQueryResult, hue = 216, allowZoom = false }) => {
  // Prepare data for the chart
  const { itemsPerCountryCount, maxItemsCountPerCountry } = useMemo(() => {
    const itemsPerCountryCount = new Map<string, number>();
    let maxItemsCountPerCountry = 0;
    countriesQueryResult.countries?.forEach((country) => {
      const count = (itemsPerCountryCount.get(country) || 0) + 1;
      maxItemsCountPerCountry = Math.max(maxItemsCountPerCountry, count);
      itemsPerCountryCount.set(country, count);
    });
    return { itemsPerCountryCount, maxItemsCountPerCountry };
  }, [countriesQueryResult.countries]);

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
        allowZoom,
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
  }, [
    itemsPerCountryCount,
    maxItemsCountPerCountry,
    hue,
    allowZoom,
    name,
    navigate,
  ]);

  // Handle errors and loading state
  const { error, isLoading, refetch } = countriesQueryResult;
  if (!error && !isLoading && itemsPerCountryCount.size === 0) return <></>;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    return <svg ref={ref} className="absolute" />;
  };

  return (
    <div
      className="relative min-h-100 min-w-full sm:min-w-150"
      style={CHART_STYLES}
    >
      {getContent()}
    </div>
  );
};

export default WorldMapChart;
