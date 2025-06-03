import { useState } from "react";
import AudienceInputs from "./AudienceInputs";
import CampaignForm from "./CampaignForm";
import { apiClient } from "../lib/api-client";
import { GET_AUDIENCE_SIZE } from "../utils/constants";

const AudiencePage = () => {
  const [currentPage, setCurrentPage] = useState('audience');
  const [audienceData, setAudienceData] = useState(null);
  const [audienceSize, setAudienceSize] = useState(null);

  const handleAudienceSubmit = (data) => {
    setAudienceData(data);
    setCurrentPage('campaign');
  };

  const handlePreviewAudience = (filters) => {
    // Simulate audience size calculation
    const calculateAudienceSize = async () => {
      try{
        const response = await apiClient.post(GET_AUDIENCE_SIZE, {
          filters
        });
        if(response.status === 200) {
          const mockSize = response.data.audienceSize; // Assuming the API returns an object with a size property
          setAudienceSize(mockSize);
        }
      } catch (error) {
        console.error("Error fetching audience size:", error);
      }
    };
    calculateAudienceSize();
  };

  const handleBackToAudience = () => {
    setCurrentPage('audience');
    setAudienceSize(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {currentPage === 'audience' && (
        <AudienceInputs
          onSubmit={handleAudienceSubmit}
          onPreview={handlePreviewAudience}
          audienceSize={audienceSize}
          initialValues={audienceData}
        />
      )}
      {currentPage === 'campaign' && (
        <CampaignForm
          onBack={handleBackToAudience}
          audienceData={audienceData}
        />
      )}
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gray-900 p-8">
  //     <div className="max-w-7xl mx-auto">
  //       <h1 className="text-3xl font-bold text-white mb-8">Audience Segmentation</h1>
  //       <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
  //         <p className="text-gray-400">Audience segmentation tools will be implemented here...</p>
  //       </div>
  //     </div>
  //   </div>
  // )
};
export default AudiencePage;