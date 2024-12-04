import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { Signal } from '../types/signal';

// Temporary mock data
const mockSignals: Signal[] = [
  {
    id: '1',
    coin: 'BTC',
    entryPrice: 65000,
    targets: [
      { price: 70000, reached: false },
      { price: 75000, reached: false },
    ],
    stopLoss: 60000,
    createdAt: new Date(),
    currentPrice: 67000,
    status: 'ACTIVE',
  },
];

export function SignalList() {
  const { isAdmin } = useAuthStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'HIT_TARGET' | 'STOPPED_OUT'>('ALL');

  const filteredSignals = mockSignals.filter(signal => {
    if (filter !== 'ALL' && signal.status !== filter) return false;
    if (search && !signal.coin.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crypto Signals</h1>
        {isAdmin() && (
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Signal
          </Link>
        )}
      </div>

      <div className="mb-6 flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by coin..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border rounded-md px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="ALL">All Signals</option>
          <option value="ACTIVE">Active</option>
          <option value="HIT_TARGET">Hit Target</option>
          <option value="STOPPED_OUT">Stopped Out</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredSignals.map((signal) => (
            <li key={signal.id} className="px-6 py-4">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getPnLColor(signal: Signal): string {
  if (!signal.currentPrice) return 'text-gray-500';
  const pnl = ((signal.currentPrice - signal.entryPrice) / signal.entryPrice) * 100;
  return pnl > 0 ? 'text-green-600' : 'text-red-600';
}

function calculatePnL(signal: Signal): string {
  if (!signal.currentPrice) return '0.00';
  const pnl = ((signal.currentPrice - signal.entryPrice) / signal.entryPrice) * 100;
  return pnl.toFixed(2);
}