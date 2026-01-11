import React, { useRef, useEffect, useCallback } from 'react';
import { caseDataMap, stateIsoCodes } from '../data/constants';

declare global {
  interface Window {
    google: any;
  }
}

interface IndiaMapProps {
  onSelectState?: (stateName: string) => void;
  containerHeight?: string;
  colorStart?: string;
  colorEnd?: string;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({ 
  onSelectState, 
  containerHeight = "500px", 
  colorStart = "#e0f2fe", 
  colorEnd = "#0369a1" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleCharts = () => {
      if (typeof window !== 'undefined' && window.google && window.google.charts) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => resolve(true);
        document.head.appendChild(script);
      });
    };

    loadGoogleCharts().then(() => {
      window.google.charts.load('current', { packages: ['geochart'] });
      window.google.charts.setOnLoadCallback(drawMap);
    });
  }, []);

  const drawMap = useCallback(() => {
    if (!window.google || !window.google.visualization || !mapRef.current) return;

    const dataArray: any[] = [['State', 'Pending Cases']];
    for (const [state, data] of Object.entries(caseDataMap)) {
      const isoCode = stateIsoCodes[state] || state;
      dataArray.push([{v: isoCode, f: state}, data.pending]);
    }

    const data = window.google.visualization.arrayToDataTable(dataArray);
    const options = {
      region: 'IN',
      resolution: 'provinces',
      displayMode: 'regions',
      colorAxis: {colors: [colorStart, colorEnd]},
      backgroundColor: 'transparent',
      datalessRegionColor: '#f8fafc',
      defaultColor: '#f1f5f9',
      tooltip: {textStyle: {fontName: 'Inter', fontSize: 13}, isHtml: true, showColorCode: true},
      legend: 'none',
      enableRegionInteractivity: true,
      keepAspectRatio: true,
    };

    const chart = new window.google.visualization.GeoChart(mapRef.current);
    
    if (onSelectState) {
      window.google.visualization.events.addListener(chart, 'select', () => {
        const selection = chart.getSelection();
        if (selection.length > 0) {
          const row = selection[0].row;
          const stateName = data.getFormattedValue(row, 0);
          onSelectState(stateName);
        }
      });
    }

    chart.draw(data, options);
  }, [onSelectState, colorStart, colorEnd]);

  useEffect(() => {
    window.addEventListener('resize', drawMap);
    return () => window.removeEventListener('resize', drawMap);
  }, [drawMap]);

  return <div ref={mapRef} style={{ width: '100%', height: containerHeight }} className="w-full" />;
};
