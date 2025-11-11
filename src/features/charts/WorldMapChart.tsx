'use client';

import * as d3 from 'd3';
import React, { useCallback, useMemo } from 'react';
import invariant from 'tiny-invariant';

import { useNavigate } from '@/hooks';
import type { NavigateType } from '@/hooks/useNavigate';
import { ErrorMessage, WaitSpinner } from '@/ui';

import type { CategoriesQueryResultType } from './types';
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
  itemsPerCategoryCount,
  maxItemsCountPerCategory,
  hue,
  name,
  allowZoom,
}: {
  current: SVGSVGElement;
  navigate: NavigateType;
  itemsPerCategoryCount: Map<string, number>;
  maxItemsCountPerCategory: number;
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
    function getCategoryName(d: IWorldGeoFeature) {
      const category = d.properties.name;
      if (category === 'England') return 'UK';
      else return category;
    }

    svgGroup
      .append('g')
      .selectAll('path')
      .data(data.features)
      .join('path')
      .attr('class', 'hover:opacity-50 stroke-neutral-500/30')
      .attr('data-category', (d) => getCategoryName(d))
      .attr(
        'data-count',
        (d) => itemsPerCategoryCount.get(getCategoryName(d)) || 'no',
      )
      .attr('fill', function (d) {
        const count = itemsPerCategoryCount.get(getCategoryName(d));
        if (count) {
          return `hsl(${hue} 100% ${
            80 - Math.round((count / maxItemsCountPerCategory) * 60)
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
  navigate?: (category: string) => void;
  categoriesQueryResult: CategoriesQueryResultType;
  hue?: number | undefined;
  allowZoom?: boolean | undefined;
  showHeader?: boolean | undefined;
}

const WorldMapChart: React.FC<WorldMapChartProps> = ({
  name,
  navigate,
  categoriesQueryResult,
  hue = 216,
  allowZoom = false,
  showHeader = false,
}) => {
  // Prepare data for the chart
  const { itemsPerCategoryCount, maxItemsCountPerCategory } = useMemo(() => {
    const itemsPerCategoryCount = new Map<string, number>();
    let maxItemsCountPerCategory = 0;
    categoriesQueryResult.categories?.forEach((category) => {
      const count = (itemsPerCategoryCount.get(category) || 0) + 1;
      maxItemsCountPerCategory = Math.max(maxItemsCountPerCategory, count);
      itemsPerCategoryCount.set(category, count);
    });
    return {
      itemsPerCategoryCount: itemsPerCategoryCount,
      maxItemsCountPerCategory,
    };
  }, [categoriesQueryResult.categories]);

  const navigateLocal = useNavigate({
    name,
    categoryQueryName: name === 'orders' ? 'ordersCountry' : 'country',
  });

  const updateCallback = useCallback(
    ({ current }: { current: SVGSVGElement }) => {
      updateChart({
        current,
        navigate: navigate ? navigate : navigateLocal,
        itemsPerCategoryCount,
        maxItemsCountPerCategory,
        hue,
        name,
        allowZoom,
      });
    },
    [
      itemsPerCategoryCount,
      maxItemsCountPerCategory,
      hue,
      name,
      allowZoom,
      navigate,
      navigateLocal,
    ],
  );

  const { ref } = useChartUpdate(updateCallback);

  // Handle errors and loading state
  const { error, isLoading, refetch } = categoriesQueryResult;
  if (!error && !isLoading && itemsPerCategoryCount.size === 0) return <></>;

  const getContent = () => {
    if (error) return <ErrorMessage error={error} retry={refetch} />;
    if (isLoading) return <WaitSpinner />;
    return <svg ref={ref} className="absolute" />;
  };

  return (
    <>
      {showHeader && (
        <h3 className="text-center text-2xl">
          Distribution of count of <b>{name}</b> by <b>countries</b>
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
