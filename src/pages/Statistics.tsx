import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', success: 12, failed: 3 },
  { month: 'Feb', success: 15, failed: 2 },
  { month: 'Mar', success: 10, failed: 5 },
];

export function Statistics() {
  const totalSignals = mockData.reduce((acc, curr) => acc + curr.success + curr.failed, 0);
  const successfulSignals = mockData.reduce((acc, curr) => acc + curr.success, 0);
  const successRate = ((successfulSignals / totalSignals) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Performance Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Signals</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalSignals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Success Rate</h3>
          <p className="text-3xl font-bold text-green-600">{successRate}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Successful Signals</h3>
          <p className="text-3xl font-bold text-blue-600">{successfulSignals}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="success" fill="#4F46E5" name="Successful" />
              <Bar dataKey="failed" fill="#EF4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}