import React from "react";
import { Target } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-lg font-bold text-white">CampaignCraft</span>
            </div>
            <p className="text-gray-400 text-sm">
              Intelligent CRM and campaign management platform designed for modern businesses.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Audience Segmentation</li>
              <li>Campaign Management</li>
              <li>Analytics & Insights</li>
              <li>AI-Powered Features</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Support</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Community</li>
              <li>Status Page</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2025 CampaignCraft. All rights reserved. Built with ❤️ for modern marketers.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;