// Type definitions for reference (JSDoc comments)

/**
 * @typedef {Object} SocialMediaAccount
 * @property {string} id
 * @property {'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'facebook'} platform
 * @property {string} username
 * @property {number} followers
 * @property {number} followersGrowth
 * @property {number} views
 * @property {number} viewsGrowth
 * @property {number} comments
 * @property {number} commentsGrowth
 * @property {number} likes
 * @property {number} likesGrowth
 * @property {number} revenue
 * @property {number} revenueGrowth
 * @property {string} avatar
 * @property {boolean} isVerified
 * @property {string} lastUpdated
 * @property {string} userId
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [avatar]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} AuthState
 * @property {User | null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 */

/**
 * @typedef {Object} Metrics
 * @property {number} totalFollowers
 * @property {number} totalViews
 * @property {number} totalComments
 * @property {number} totalRevenue
 * @property {number} engagementRate
 * @property {number} growthRate
 */

/**
 * @typedef {Object} ChartData
 * @property {string} date
 * @property {number} followers
 * @property {number} views
 * @property {number} revenue
 */

// Export empty object to make this a module
export {};