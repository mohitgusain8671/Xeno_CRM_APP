import { MessageSquare, Users, TrendingUp, BarChart3, Target, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Active Campaigns', value: '24', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Total Customers', value: '12,847', icon: Users, color: 'text-green-500' },
    { label: 'Delivery Rate', value: '94.2%', icon: TrendingUp, color: 'text-purple-500' },
    { label: 'This Month', value: '156K', icon: BarChart3, color: 'text-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-blue-500">CampaignCraft</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Craft intelligent campaigns with AI-powered audience segmentation, 
            real-time analytics, and seamless delivery management.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <Shield className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Secure & Scalable</h3>
            <p className="text-gray-400">
              Built with enterprise-grade security and designed to scale with your business. 
              Google OAuth integration ensures safe and seamless authentication.
            </p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <Target className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">AI-Powered Targeting</h3>
            <p className="text-gray-400">
              Leverage advanced AI algorithms to create precise audience segments 
              and optimize campaign performance with intelligent recommendations.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-6">
            Create your first audience segment and launch targeted campaigns in minutes.
          </p>
          <button 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors hover:cursor-pointer hover:bg-blue-300/50 hover:text-white"
            onClick={() =>
              navigate('/audience')
            }
          >
            Create Your First Campaign
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;