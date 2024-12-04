import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Target } from '../types/signal';

interface TargetInputProps {
  targets: Target[];
  onTargetChange: (targets: Target[]) => void;
}

export function TargetInput({ targets, onTargetChange }: TargetInputProps) {
  const handleAddTarget = () => {
    onTargetChange([...targets, { price: 0, reached: false }]);
  };

  const handleRemoveTarget = (index: number) => {
    onTargetChange(targets.filter((_, i) => i !== index));
  };

  const handlePriceChange = (index: number, price: number) => {
    const newTargets = targets.map((target, i) =>
      i === index ? { ...target, price } : target
    );
    onTargetChange(newTargets);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Targets
        </label>
        <button
          type="button"
          onClick={handleAddTarget}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Add Target
        </button>
      </div>
      {targets.map((target, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Target {index + 1}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={target.price || ''}
                onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          {targets.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveTarget(index)}
              className="mt-6 p-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}