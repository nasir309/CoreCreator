import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Music, 
  Facebook, 
  CheckCircle, 
  Eye, 
  MessageCircle, 
  Heart, 
  Users,
  DollarSign,
  Edit3
} from 'lucide-react';

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: Music,
  facebook: Facebook
};

const platformColors = {
  instagram: 'from-pink-500 to-purple-600',
  youtube: 'from-red-500 to-red-600',
  twitter: 'from-blue-400 to-blue-600',
  tiktok: 'from-black to-gray-800',
  facebook: 'from-blue-600 to-blue-700'
};

export const AccountCard = ({ account, onEdit }) => {
  const PlatformIcon = platformIcons[account.platform];
  const gradientClass = platformColors[account.platform];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 relative group">
      <button
        onClick={() => onEdit(account)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all opacity-0 group-hover:opacity-100"
        title="Edit Account"
      >
        <Edit3 className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradientClass} text-white`}>
            <PlatformIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{account.username}</h3>
              {account.isVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Updated {account.lastUpdated}</p>
          </div>
        </div>
        <img 
          src={account.avatar} 
          alt={account.username}
          className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Followers</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{formatNumber(account.followers)}</p>
          <p className={`text-xs ${account.followersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {account.followersGrowth >= 0 ? '+' : ''}{account.followersGrowth.toFixed(1)}%
          </p>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Eye className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Views</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{formatNumber(account.views)}</p>
          <p className={`text-xs ${account.viewsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {account.viewsGrowth >= 0 ? '+' : ''}{account.viewsGrowth.toFixed(1)}%
          </p>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <MessageCircle className="w-4 h-4 text-teal-500 mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Comments</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{formatNumber(account.comments)}</p>
          <p className={`text-xs ${account.commentsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {account.commentsGrowth >= 0 ? '+' : ''}{account.commentsGrowth.toFixed(1)}%
          </p>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <DollarSign className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">${formatNumber(account.revenue)}</p>
          <p className={`text-xs ${account.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {account.revenueGrowth >= 0 ? '+' : ''}{account.revenueGrowth.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {formatNumber(account.likes)} likes
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Engagement: {account.followers > 0 ? ((account.comments + account.likes) / account.followers * 100).toFixed(1) : '0.0'}%
        </div>
      </div>
    </div>
  );
};