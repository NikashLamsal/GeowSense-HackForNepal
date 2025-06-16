import { ReactNode } from 'react';

interface ChartSectionProps {
  chartPosition: 'left' | 'right';
  chartComponent: ReactNode;
  children: ReactNode;
}

export default function ChartSection({
  chartPosition,
  chartComponent,
  children,
}: ChartSectionProps) {
  const baseClass = 'grid grid-cols-1 md:grid-cols-2 gap-6 p-6';

  return (
    <div className={baseClass}>
      {chartPosition === 'left' ? (
        <>
          <div className="bg-white rounded-2xl p-4 shadow-md">{chartComponent}</div>
          <div className="text-gray-700 p-6 border border-green-200 rounded-xl shadow-inner bg-green-50">
            <div className="flex justify-center">
              <div className="space-y-4 text-left text-gray-700 text-[1.05rem] leading-relaxed max-w-xl">
                {children}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-gray-700 p-6 border border-green-200 rounded-xl shadow-inner bg-green-50">
            <div className="flex justify-center">
              <div className="space-y-4 text-left text-gray-700 text-[1.05rem] leading-relaxed max-w-xl">
                {children}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md">{chartComponent}</div>
        </>
      )}
    </div>
  );
}
