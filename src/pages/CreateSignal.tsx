import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TargetInput } from '../components/TargetInput';
import { PriceInput } from '../components/PriceInput';
import type { Target } from '../types/signal';

export function CreateSignal() {
  const navigate = useNavigate();
  const { requireAdmin } = useAuth();
  const [coin, setCoin] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [targets, setTargets] = useState<Target[]>([{ price: 0, reached: false }]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Check if user is admin when component mounts
    if (!requireAdmin()) {
      return;
    }
  }, [requireAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify admin status again before submission
    if (!requireAdmin()) {
      return;
    }

    const signal = {
      coin: coin.toUpperCase(),
      entryPrice: parseFloat(entryPrice),
      stopLoss: parseFloat(stopLoss),
      targets,
      notes,
      createdAt: new Date(),
      status: 'ACTIVE' as const,
    };

    try {
      // TODO: Implement API call to create signal
      console.log('Creating signal:', signal);
      navigate('/');
    } catch (error) {
      console.error('Error creating signal:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Signal</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="coin" className="block text-sm font-medium text-gray-700">
            Coin
          </label>
          <input
            type="text"
            id="coin"
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="BTC"
            required
          />
        </div>

        <PriceInput
          label="Entry Price"
          value={entryPrice}
          onChange={setEntryPrice}
          required
        />

        <PriceInput
          label="Stop Loss"
          value={stopLoss}
          onChange={setStopLoss}
          required
        />

        <TargetInput
          targets={targets}
          onTargetChange={setTargets}
        />

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Add any additional information or strategy notes..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Signal
          </button>
        </div>
      </form>
    </div>
  );
}