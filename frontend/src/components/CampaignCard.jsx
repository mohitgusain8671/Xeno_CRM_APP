// Campaign Card Component
import React from 'react';
import { Edit2, Trash2, Activity, Users, Calendar, Filter } from 'lucide-react';
import { DELETE_CAMPAIGN, INITIATE_CAMPAIGN } from '../utils/constants';
import { apiClient } from '../lib/api-client';

const CampaignCard = ({ campaign, isOwner = false }) => {
  console.log("Campaign Card Rendered", campaign);
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const generateAISummary = async (campaign) => {

  }
  const onEdit = (campaign) => {
    toast.error("Edit functionality is coming soon!");
  }
  const onDelete = async (campaign) =>{
    try{
      const response = await apiClient.delete(DELETE_CAMPAIGN.replace(':id', campaign._id), {withCredentials: true});
      if(response.status === 200){
        window.location.reload();
        toast.success("Campaign deleted successfully!");
      }
    } catch(error){
      console.error(error);
    }
  }
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'Not started';
  };

  const onInitiate = async (campaign) => {
    try{
      const response = await apiClient.post(INITIATE_CAMPAIGN.replace(':id', campaign._id),{}, {withCredentials: true});
      if (response.status === 202) {
        window.location.reload();
        toast.success("Campaign initiated successfully!");
      } else {
        console.error('Failed to initiate campaign:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getActiveConditions = (conditions) => {
    return Object.entries(conditions)
      .filter(([key, value]) => value !== '' && value != null)
      .map(([key, value]) => {
        const labels = {
          totalSpendMin: 'Min Spend',
          totalSpendMax: 'Max Spend',
          avgOrderValueMin: 'Min Avg Order',
          avgOrderValueMax: 'Max Avg Order',
          inactiveDays: 'Inactive Days',
          visitCountMin: 'Min Visits',
          visitCountMax: 'Max Visits',
          daysSinceJoining: 'Days Since Join',
          totalOrdersMin: 'Min Orders',
          totalOrdersMax: 'Max Orders'
        };
        return { label: labels[key] || key, value };
      });
  };

  const activeConditions = getActiveConditions(campaign.conditions);

  return (
    <div className="bg-gray-800 relative rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{campaign.name}</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(campaign.status)}`}>
            <Activity className="w-3 h-3 mr-1" />
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          {isOwner && onEdit && (
            <button
              onClick={() => onEdit(campaign)}
              className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
              title="Edit Campaign (Coming Soon)"
              disabled
            >
              <Edit2 className="w-4 h-4 opacity-50" />
            </button>
          )}
          {isOwner && onDelete && (
            <button
              onClick={() => onDelete(campaign)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete Campaign"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isOwner && campaign.status === 'draft' && (
        <button
            onClick={() => onInitiate(campaign)}
            className="p-2 text-white mb-1 bg-purple-600 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors text-center w-full"
            title="Initiate Campaign"
        >Initiate Campaign 
        </button>
      )}

      {/* Description */}
      <p className="text-gray-300 mb-4 line-clamp-2">{campaign.description}</p>

      {/* Personalized Message */}
      <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-400 mb-1">Personalized Message:</p>
        <p className="text-gray-200 italic">"{campaign.personalizedMessage}"</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Audience Size</p>
            <p className="text-white font-semibold">{campaign.audienceSize.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-purple-400" />
          <div>
            <p className="text-sm text-gray-400">Started</p>
            <p className="text-white font-semibold">{formatDate(campaign.inititatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Conditions */}
      {activeConditions.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="w-4 h-4 text-orange-400" />
            <p className="text-sm text-gray-400 font-medium">Active Filters</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeConditions.slice(0, 3).map((condition, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
              >
                {condition.label}: {condition.value}
              </span>
            ))}
            {activeConditions.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md">
                +{activeConditions.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {
        isOwner && (
          <button
            onClick={() => generateAISummary(campaign)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            title="Generate AI SUMMARY"
          >
            Generate AI Summary
          </button>
        )
      }
    </div>
  );
};

export default CampaignCard;