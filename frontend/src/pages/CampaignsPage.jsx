import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import CampaignCard from "../components/CampaignCard";
import { apiClient } from "../lib/api-client.js"
import { GET_ALL_CAMPAIGNS} from "../utils/constants.js";
import { toast } from "react-toastify";
import { useAppStore } from "../store/index.js";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { userInfo } = useAppStore();
  useEffect(() => {
    const fetchCampaigns = async () => {
      try{
        const response = await apiClient.get(GET_ALL_CAMPAIGNS,{withCredentials: true});
        if (response.status === 200) {
          const data = response.data
          setCampaigns(data);
          toast.success("Campaigns fetched successfully");
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchCampaigns();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white text-wrap">Campaign Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Total Campaigns: <span className="text-white font-semibold">{campaigns.length}</span>
            </div>
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            isOwner={false}
            // onView={handleViewCampaign}
          />
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="bg-gray-800 p-12 rounded-lg border border-gray-700 text-center">
          <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No campaigns found</p>
          <p className="text-gray-500 mt-2">Check back later for new campaigns.</p>
          </div>
      )}
      </div>
    </div>
  );
};
export default CampaignsPage;