import React from 'react';

const Skeleton = ({ className = '', variant = 'text', ...props }) => {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  return (
    <div 
      className={`animate-pulse bg-gray-200 ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

// Pre-built skeleton components
export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
    <Skeleton className="w-full h-48" variant="rectangular" />
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12" variant="circular" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
    <div className="p-4 border-b border-gray-100">
      <Skeleton className="h-8 w-48" />
    </div>
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="p-4 flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-xl" variant="rectangular" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="bg-white rounded-2xl shadow-card p-6 text-center">
        <Skeleton className="h-12 w-12 mx-auto mb-3" variant="circular" />
        <Skeleton className="h-8 w-20 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </div>
    ))}
  </div>
);

export default Skeleton;
