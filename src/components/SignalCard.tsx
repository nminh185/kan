import React from 'react';
import type { Signal } from '../types/signal';
import { getPnLColor, calculatePnL } from '../utils/calculations';

interface SignalCardProps {
  signal: Signal;
}

export function SignalCard({ signal }: SignalCardProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{signal.coin}</h3>
        <p className="text-sm text-gray-500">
          Entry: ${signal.entryPrice.toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          Current: ${signal.currentPrice?.toLocaleString()}
        </p>
        <p className={`text-sm ${getPnLColor(signal)}`}>
          {calculatePnL(signal)}%
        </p>
      </div>
    </div>
  );
}