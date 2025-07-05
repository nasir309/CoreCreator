import React, { useState } from 'react';
import { useAccounts } from '../contexts/AccountsContext';
import { useAuth } from '../contexts/AuthContext';
import { MetricsCard } from './MetricsCard';
import { AccountCard } from './AccountCard';
import { AnalyticsChart } from './AnalyticsChart';
import { AddAccountModal } from './AddAccountModal';
import { EditAccountModal } from './EditAccountModal';
import { SettingsModal } from './SettingsModal';
import { 
  Users, 
  Eye, 
  MessageCircle, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  Plus,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

export const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('followers');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const { accounts, isLoading } = useAccounts();
  const { user, logout } = useAuth();

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowEditModal(true);
  };

  const totalMetrics = accounts.reduce((acc, account) => ({
    followers: acc.followers + account.followers,
    views: acc.views + account.views,
    comments: acc.comments + account.comments,
    revenue: acc.revenue + account.revenue
  }), { followers: 0, views: 0, comments: 0, revenue: 0 });

  const totalGrowth = accounts.reduce((acc, account) => ({
    followers: acc.followers + account.followersGrowth,
    views: acc.views + account.viewsGrowth,
    comments: acc.comments + account.commentsGrowth,
    revenue: acc.revenue + account.revenueGrowth
  }), { followers: 0, views: 0, comments: 0, revenue: 0 });

  const avgGrowth = accounts.length > 0 ? {
    followers: totalGrowth.followers / accounts.length,
    views: totalGrowth.views / accounts.length,
    comments: totalGrowth.comments / accounts.length,
    revenue: totalGrowth.revenue / accounts.length
  } : { followers: 0, views: 0, comments: 0, revenue: 0 };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Generate mock chart data based on user accounts
  const generateChartData = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates.map((date, index) => ({
      date,
      followers: Math.floor(totalMetrics.followers * (0.85 + (index * 0.025))),
      views: Math.floor(totalMetrics.views * (0.8 + (index * 0.035))),
      revenue: Math.floor(totalMetrics.revenue * (0.75 + (index * 0.045)))
    }));
  };

  const chartData = generateChartData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SocialHub</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
                <span>Welcome, {user?.name}</span>
              </div>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {accounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Started</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Add your first social media account to start tracking your performance and growth.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Account</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricsCard
                title="Total Followers"
                value={formatNumber(totalMetrics.followers)}
                growth={avgGrowth.followers}
                icon={<Users className="w-6 h-6" />}
                color="blue"
              />
              <MetricsCard
                title="Total Views"
                value={formatNumber(totalMetrics.views)}
                growth={avgGrowth.views}
                icon={<Eye className="w-6 h-6" />}
                color="purple"
              />
              <MetricsCard
                title="Total Comments"
                value={formatNumber(totalMetrics.comments)}
                growth={avgGrowth.comments}
                icon={<MessageCircle className="w-6 h-6" />}
                color="teal"
              />
              <MetricsCard
                title="Total Revenue"
                value={`$${formatNumber(totalMetrics.revenue)}`}
                growth={avgGrowth.revenue}
                icon={<DollarSign className="w-6 h-6" />}
                color="green"
              />
            </div>

            {/* Analytics Chart */}
            {totalMetrics.followers > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Overview</h2>
                  <div className="flex space-x-2">
                    {['followers', 'views', 'revenue'].map((metric) => (
                      <button
                        key={metric}
                        onClick={() => setSelectedMetric(metric)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          selectedMetric === metric
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <AnalyticsChart data={chartData} metric={selectedMetric} />
              </div>
            )}

            {/* Account Cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Accounts</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{accounts.filter(a => a.followersGrowth > 0).length} accounts growing</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {accounts.map((account) => (
                  <AccountCard 
                    key={account.id} 
                    account={account} 
                    onEdit={handleEditAccount}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{accounts.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Connected Accounts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {totalMetrics.followers > 0 ? (totalMetrics.comments / totalMetrics.followers * 100).toFixed(1) : '0.0'}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">
                    ${totalMetrics.followers > 0 ? (totalMetrics.revenue / totalMetrics.followers * 1000).toFixed(2) : '0.00'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Revenue per 1K</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {accounts.filter(a => a.followersGrowth > 0).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Growing Accounts</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      <AddAccountModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
      <EditAccountModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        account={editingAccount}
      />
      <SettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)} 
      />
    </div>
  );
};