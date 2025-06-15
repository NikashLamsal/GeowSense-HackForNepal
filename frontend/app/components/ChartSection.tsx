import { ReactNode } from 'react';

export default function ChartSection({
  chartPosition,
  chartComponent,
  description,
}: {
  chartPosition: 'left' | 'right';
  chartComponent: ReactNode;
  description: string;
}) {
  const baseClass = 'grid grid-cols-1 md:grid-cols-2 gap-6 p-6';

  return (
    <div className={baseClass}>
      {chartPosition === 'left' ? (
        <>
          <div className="bg-white rounded-2xl p-4 shadow-md">{chartComponent}</div>
          <div className="text-gray-700 p-6 border border-green-200 rounded-xl shadow-inner bg-green-50">
            <p>{description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-gray-700 p-6 border border-green-200 rounded-xl shadow-inner bg-green-50">
            <p>{description}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md">{chartComponent}</div>
        </>
      )}
    </div>
  );
}
