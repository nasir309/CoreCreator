import React, { useState } from 'react';
import { useAccounts } from '../contexts/AccountsContext';
import { X, Instagram, Youtube, Twitter, Music, Facebook } from 'lucide-react';

const platformOptions = [
  { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600' },
  { value: 'twitter', label: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600' },
  { value: 'tiktok', label: 'TikTok', icon: Music, color: 'from-black to-gray-800' },
  { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
];

export const AddAccountModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    username: '',
    followers: 0,
    views: 0,
    comments: 0,
    likes: 0,
    revenue: 0,
    isVerified: false,
  });

  const { addAccount } = useAccounts();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAccount = {
      ...formData,
      followersGrowth: Math.random() * 20 - 5, // Random growth between -5% and 15%
      viewsGrowth: Math.random() * 25 - 5,
      commentsGrowth: Math.random() * 30 - 10,
      likesGrowth: Math.random() * 20 - 5,
      revenueGrowth: Math.random() * 40 - 10,
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      lastUpdated: 'Just now',
    };

    addAccount(newAccount);
    onClose();
    
    // Reset form
    setFormData({
      platform: 'instagram',
      username: '',
      followers: 0,
      views: 0,
      comments: 0,
      likes: 0,
      revenue: 0,
      isVerified: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : 
               type === 'checkbox' ? e.target.checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Social Media Account</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Platform</label>
            <div className="grid grid-cols-2 gap-3">
              {platformOptions.map((platform) => {
                const Icon = platform.icon;
                return (
                  <label
                    key={platform.value}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.platform === platform.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={platform.value}
                      checked={formData.platform === platform.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${platform.color} text-white mr-3`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{platform.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="@username"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="followers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Followers
              </label>
              <input
                type="number"
                id="followers"
                name="followers"
                value={formData.followers}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="views" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Views
              </label>
              <input
                type="number"
                id="views"
                name="views"
                value={formData.views}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments
              </label>
              <input
                type="number"
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="likes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Likes
              </label>
              <input
                type="number"
                id="likes"
                name="likes"
                value={formData.likes}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Revenue ($)
            </label>
            <input
              type="number"
              id="revenue"
              name="revenue"
              value={formData.revenue}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isVerified"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isVerified" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Verified account
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};