import React, { useRef, useEffect, useState } from 'react';

declare global {
  interface Window {
    Chart: any;
  }
}

interface BarChartProps {
  labels: string[];
  data: number[];
  label: string;
}

export const GenericBarChart: React.FC<BarChartProps> = ({ labels, data, label }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const [chartReady, setChartReady] = useState<boolean>(false);

  // --- CDN LOADER (FOR PREVIEW ONLY) ---
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Chart) {
      setChartReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    script.onload = () => setChartReady(true);
    document.body.appendChild(script);
  }, []);
  // -------------------------------------

  useEffect(() => {
    const ChartConstructor = typeof window !== 'undefined' ? window.Chart : null;
    if (!chartReady || !chartRef.current || !ChartConstructor) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const config = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: '#6FAEF5',
          hoverBackgroundColor: '#1D8CF8',
          borderRadius: 4,
          barThickness: 12,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleFont: { family: 'Inter', size: 13, weight: '600' },
            bodyFont: { family: 'Inter', size: 13 },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: (items: any[]) => items[0].label,
              label: (item: any) => `${item.formattedValue} ${label}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 11, family: 'Inter', weight: '500' },
              maxRotation: 45,
              minRotation: 45,
              autoSkip: false,
              color: '#64748b'
            }
          },
          y: {
            grid: { borderDash: [4, 4], color: '#e2e8f0', drawBorder: false },
            beginAtZero: true,
            ticks: {
              color: '#94a3b8',
              font: { family: 'Inter', size: 11 },
              padding: 10
            },
            border: { display: false }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart',
          delay: (context: any) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !context.dropped) {
              delay = context.dataIndex * 50 + context.datasetIndex * 100;
              context.dropped = true;
            }
            return delay;
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
          animationDuration: 200
        }
      }
    };

    chartInstance.current = new ChartConstructor(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartReady, labels, data, label]);

  return (
    <div className="h-[350px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
