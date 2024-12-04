import type { Signal } from '../types/signal';

export function getPnLColor(signal: Signal): string {
  if (!signal.currentPrice) return 'text-gray-500';
  const pnl = ((signal.currentPrice - signal.entryPrice) / signal.entryPrice) * 100;
  return pnl > 0 ? 'text-green-600' : 'text-red-600';
}

export function calculatePnL(signal: Signal): string {
  if (!signal.currentPrice) return '0.00';
  const pnl = ((signal.currentPrice - signal.entryPrice) / signal.entryPrice) * 100;
  return pnl.toFixed(2);
}