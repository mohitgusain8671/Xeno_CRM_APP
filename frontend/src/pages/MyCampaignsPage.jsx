import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import CampaignCard from '../components/CampaignCard';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { GET_USER_CAMPAIGNS } from '../utils/constants';
import { toast } from 'react-toastify';
const MyCampaignsPage = () => {
  const navigate = useNavigate();
  const [myCampaigns, setMyCampaigns] = useState([])

  const handleEditCampaign = (campaign) => {
    toast.success('Edit functionality will be available soon!');
  };

  const handleDeleteCampaign = (campaign) => {
    if (window.confirm(`Are you sure you want to delete "${campaign.name}"?`)) {
      setMyCampaigns(prev => prev.filter(c => c._id !== campaign._id));
    }
  };

  const getStatusStats = () => {
    const stats = myCampaigns.reduce((acc, campaign) => {
      acc[campaign.status] = (acc[campaign.status] || 0) + 1;
      return acc;
    }, {});
    return stats;
  };

  const statusStats = getStatusStats();

  useEffect(()=>{
    const fetchMyCampaigns = async () => {
      try{
        const response = await apiClient.get(GET_USER_CAMPAIGNS, { withCredentials: true });
        if (response.status === 200) {
          const data = response.data;
          setMyCampaigns(data);
          toast.success("Campaigns fetched successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch campaigns");
      }
    }
    fetchMyCampaigns();
  },[])
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Campaigns</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Create New Campaign
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-white">{myCampaigns.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400">{statusStats.active || 0}</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Draft</p>
                <p className="text-2xl font-bold text-yellow-400">{statusStats.draft || 0}</p>
              </div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-400">{statusStats.completed || 0}</p>
              </div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
              isOwner={true}
              onEdit={handleEditCampaign}
              onDelete={handleDeleteCampaign}
            />
          ))}
        </div>

        {myCampaigns.length === 0 && (
          <div className="bg-gray-800 p-12 rounded-lg border border-gray-700 text-center">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No campaigns yet</p>
            <p className="text-gray-500 mt-2 mb-6">Create your first campaign to get started.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={() => navigate('/audience')}
            >
              Create Your First Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyCampaignsPage;