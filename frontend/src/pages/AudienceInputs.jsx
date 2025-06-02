import React, { useState } from 'react'
import { ChevronLeft, Users, Target, Calendar, DollarSign, ShoppingCart, Clock } from 'lucide-react';
const AudienceInputs = ({ onSubmit, onPreview, audienceSize, initialValues }) => {
  const [filters, setFilters] = useState(initialValues || {
    totalSpendMin: '',
    totalSpendMax: '',
    avgOrderValueMin: '',
    avgOrderValueMax: '',
    inactiveDays: '',
    visitCountMin: '',
    visitCountMax: '',
    daysSinceJoining: '',
    totalOrdersMin: '',
    totalOrdersMax: ''
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    onPreview(filters);
  };

  const handleSaveAndNext = () => {
    onSubmit(filters);
  };

  const isFormValid = () => {
    return Object.values(filters).some(value => value !== '');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Audience Segmentation</h1>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">Define Your Target Audience</h2>
            <p className="text-gray-400">Set filters to segment your customers based on their behavior and characteristics.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Total Spend Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-medium text-white">Total Spend</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum ($)</label>
                  <input
                    type="number"
                    value={filters.totalSpendMin}
                    onChange={(e) => handleInputChange('totalSpendMin', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maximum ($)</label>
                  <input
                    type="number"
                    value={filters.totalSpendMax}
                    onChange={(e) => handleInputChange('totalSpendMax', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="No limit"
                  />
                </div>
              </div>
            </div>

            {/* Average Order Value Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-medium text-white">Average Order Value</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum ($)</label>
                  <input
                    type="number"
                    value={filters.avgOrderValueMin}
                    onChange={(e) => handleInputChange('avgOrderValueMin', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maximum ($)</label>
                  <input
                    type="number"
                    value={filters.avgOrderValueMax}
                    onChange={(e) => handleInputChange('avgOrderValueMax', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="No limit"
                  />
                </div>
              </div>
            </div>

            {/* Inactive Days Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-medium text-white">Customer Activity</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Inactive Days (Last Visit)</label>
                <input
                  type="number"
                  value={filters.inactiveDays}
                  onChange={(e) => handleInputChange('inactiveDays', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 30 (customers inactive for 30+ days)"
                />
              </div>
            </div>

            {/* Visit Count Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-medium text-white">Visit Frequency</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Visits</label>
                  <input
                    type="number"
                    value={filters.visitCountMin}
                    onChange={(e) => handleInputChange('visitCountMin', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Visits</label>
                  <input
                    type="number"
                    value={filters.visitCountMax}
                    onChange={(e) => handleInputChange('visitCountMax', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="No limit"
                  />
                </div>
              </div>
            </div>

            {/* Days Since Joining Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-medium text-white">Account Age</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Days Since Joining</label>
                <input
                  type="number"
                  value={filters.daysSinceJoining}
                  onChange={(e) => handleInputChange('daysSinceJoining', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 90 (customers joined 90+ days ago)"
                />
              </div>
            </div>

            {/* Total Orders Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg font-medium text-white">Order History</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Orders</label>
                  <input
                    type="number"
                    value={filters.totalOrdersMin}
                    onChange={(e) => handleInputChange('totalOrdersMin', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Orders</label>
                  <input
                    type="number"
                    value={filters.totalOrdersMax}
                    onChange={(e) => handleInputChange('totalOrdersMax', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="No limit"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Audience Size Preview */}
          {audienceSize !== null && (
            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Estimated Audience Size</h3>
                  <p className="text-blue-400 text-2xl font-bold">{audienceSize.toLocaleString()} customers</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePreview}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Preview Audience Size
            </button>
            
            <button
              onClick={handleSaveAndNext}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              Save & Next
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudienceInputs