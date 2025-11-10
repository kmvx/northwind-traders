'use client';

import * as d3 from 'd3';
import React, { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';

import { useNavigate } from '@/hooks';
import { ErrorMessage, WaitSpinner } from '@/ui';

import type { CountriesQueryResultType } from './types';
import useChartUpdate from './useChartUpdate';
import { addTooltip, CHART_STYLES } from './utilsCharts';

interface IWorldGeo {
  features: IWorldGeoFeature[];
}

type IWorldGeoFeature = d3.GeoPermissibleObjects & {
  properties: { name: string };
};

function updateChart({
  current,
  navigate,
  itemsPerCountryCount,
  maxItemsCountPerCountry,
  hue,
  name,
  allowZoom,
}: {
  current: SVGSVGElement;
  navigate: (path: string) => void;
  itemsPerCountryCount: Map<string, number>;
  maxItemsCountPerCountry: number;
  hue: number;
  name: string;
  allowZoom: boolean;
}) {
  d3.json<IWorldGeo>(
    'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
  ).then(function (data) {
    invariant(data);

    // Draw the map
    const svg = d3.select(current);
    svg.selectAll('*').remove();

    const parentNode = current.parentNode as HTMLElement;
    invariant(parentNode);
    const parentWidth = parentNode.clientWidth;
    const parentHeight = parentNode.clientHeight;
    svg.attr('width', parentWidth).attr('height', parentHeight);

    const projection = d3
      .geoNaturalEarth1()
      //.geoAzimuthalEqualArea()
      //.geoCylindricalEqualArea()
      .scale(parentWidth / 1.5 / Math.PI)
      .translate([parentWidth / 2.2, parentHeight / 2]);

    const svgGroup = svg.append('g');

    // Background
    svgGroup
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', parentWidth)
      .attr('height', parentHeight)
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
        .filter(function (
          event: MouseEvent | PointerEvent | TouchEvent | WheelEvent,
        ) {
          // Don't block scrolling events if there is no zoom transform
          if ('touches' in event) {
            const touches = event.touches;
            if (touches.length === 1) {
              const node = svg.node();
              invariant(node);
              if (Math.abs(d3.zoomTransform(node).k - 1) < 1e-5) {
                return false;
              }
            }
          }
          return true;
        })
        .on('zoom', function (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
          if (
            Math.abs(event.transform.k - 1) < 1e-5 &&
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

interface WorldMapChartProps {
  name: 'orders' | 'customers' | 'suppliers';
  countriesQueryResult: CountriesQueryResultType;
  hue?: number | undefined;
  allowZoom?: boolean | undefined;
  showHeader?: boolean | undefined;
}

const WorldMapChart: React.FC<WorldMapChartProps> = ({
  name,
  countriesQueryResult,
  hue = 216,
  allowZoom = false,
  showHeader = false,
}) => {
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
        allowZoom,
      });
    },
    [
      itemsPerCountryCount,
      maxItemsCountPerCountry,
      hue,
      name,
      allowZoom,
      navigate,
    ],
  );

  const { ref } = useChartUpdate(updateCallback);

  // Handle errors and loading state
  const { error, isLoading, refetch } = countriesQueryResult;
  if (!error && !isLoading && itemsPerCountryCount.size === 0) return <></>;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    return <svg ref={ref} className="absolute" />;
  };

  return (
    <>
      {showHeader && (
        <h3 className="text-center text-2xl">
          Distribution of count of <b>{name}</b> by countries
        </h3>
      )}
      <div
        className="relative sm:min-h-100 min-w-full sm:min-w-150 aspect-[1.5] flex justify-center"
        style={CHART_STYLES}
      >
        {getContent()}
      </div>
    </>
  );
};

export default WorldMapChart;
