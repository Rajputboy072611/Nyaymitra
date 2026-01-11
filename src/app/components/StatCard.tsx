import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  subTitle: string;
  value: number | string;
  colorClass: string;
  bgClass: string;
  iconColorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  subTitle,
  value,
  colorClass,
  bgClass,
  iconColorClass
}) => {
  const formatNumber = (num: number | string): string => {
    if (typeof num === 'string') return num;
    return num.toLocaleString('en-IN');
  };

  return (
    <div className={`${bgClass} p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClass} flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">{title}</h4>
          <p className={`text-3xl font-bold ${colorClass} mb-1`}>{formatNumber(value)}</p>
          <p className="text-xs text-slate-400">{subTitle}</p>
        </div>
      </div>
    </div>
  );
};
