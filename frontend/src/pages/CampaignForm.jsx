import { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { CREATE_CAMPAIGN } from "../utils/constants";
import { apiClient } from "../lib/api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CampaignForm = ({ onBack, audienceData }) => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    message: 'Hi {{name}}, we have an exciting offer just for you! Check it out!',
  });

  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCampaign = async() => {
    try{
      const res = await apiClient.post(CREATE_CAMPAIGN, {
        name: campaignData.name,
        description: campaignData.description,
        personalizedMessage: campaignData.message,
        conditions: audienceData,
      }, {withCredentials: true});
      if (res.status === 201) {
        toast.success("Campaign created successfully!");
        setTimeout(()=> navigate('/my-campaigns'), 1000);
        
      } else {
        console.error("Failed to create campaign:", res.data);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const isFormValid = () => {
    return campaignData.name && campaignData.description && campaignData.message;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <Plus className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">Create New Campaign</h1>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <div className="space-y-6">
            
            {/* Campaign Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter campaign name"
                />
              </div>
            </div>

            {/* Campaign Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={campaignData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your campaign objective and target"
              />
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message Content *</label>
              <textarea
                value={campaignData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your campaign message..."
              />
            </div>


            {/* Audience Summary */}
            <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <h3 className="text-lg font-medium text-white mb-2">Target Audience Summary</h3>
              <div className="text-sm text-gray-300 space-y-1">
                {Object.entries(audienceData || {}).map(([key, value]) => {
                  if (value) {
                    const labelMap = {
                      totalSpendMin: 'Total Spend (Min)',
                      totalSpendMax: 'Total Spend (Max)',
                      avgOrderValueMin: 'Avg Order Value (Min)',
                      avgOrderValueMax: 'Avg Order Value (Max)',
                      inactiveDays: 'Inactive Days',
                      visitCountMin: 'Visit Count (Min)',
                      visitCountMax: 'Visit Count (Max)',
                      daysSinceJoining: 'Days Since Joining',
                      totalOrdersMin: 'Total Orders (Min)',
                      totalOrdersMax: 'Total Orders (Max)',
                    };
                    return (
                      <div key={key} className="flex justify-between">
                        <span>{labelMap[key] || key}:</span>
                        <span className="text-blue-400">{value}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Audience
              </button>
              
              <button
                onClick={handleCreateCampaign}
                disabled={!isFormValid()}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignForm;