import * as d3 from 'd3';

export function addTooltip({
  svg,
  hue,
  name,
  navigate,
}: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  hue: number;
  name: string;
  navigate: (path: string) => void;
}) {
  const svgParent = d3.select(svg.node()?.parentNode as Element);
  svgParent.selectAll('.u-chart-tooltip').remove();

  const tooltip = svgParent
    .append('div')
    .attr('class', 'u-chart-tooltip ' + CHART_TOOLTIP_CLASS_NAMES)
    .style('border-color', `hsl(${hue} 100% 50%`)
    .style('visibility', 'hidden');

  svgParent
    .on('mousemove', (event: MouseEvent) => {
      const target = d3.select(event.target as Element);
      const category = target.attr('data-category');
      let cursor = null;
      if (category) {
        const count = target.attr('data-count');
        tooltip
          .html(`<b>${category}</b>: <b>${count}</b> ${name}`)
          .style('visibility', 'visible');
        if (+count) {
          cursor = 'pointer';
        }
      } else {
        tooltip.html('').style('visibility', 'hidden');
      }
      svg.style('cursor', cursor ?? '');

      // Set position
      const width = tooltip.node()?.clientWidth || 0;
      let left = event.offsetX - width - 25;
      left = Math.max(0, left);
      tooltip
        .style('left', left + 'px')
        .style('top', event.offsetY + 25 + 'px');
    })
    .on('mouseout', () => {
      tooltip.html('').style('visibility', 'hidden');
    })
    .on('click', (event) => {
      const target = d3.select(event.target as Element);
      if (+target.attr('data-count')) {
        navigate(
          `/${name}?${name === 'orders' ? 'ordersCountry' : 'country'}=${target.attr('data-category')}`,
        );
      }
    });
}

export const CHART_TOOLTIP_CLASS_NAMES =
  'absolute pointer-events-none px-2 py-1 border bg-white/80 dark:bg-black/80 text-center z-100 text-xs';

export const CHART_STYLES = {
  '--chart-text-color': '#888',
  '--chart-line-color': '#0d6efd',
} as React.CSSProperties;
