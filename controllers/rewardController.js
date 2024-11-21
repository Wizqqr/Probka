import Reward from '../models/Reward.js'
import User from '../models/User.js';

export const getRewards = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ success: false, message: 'user_id is required' });
    }

    const rewards = await Reward.find();

    res.status(200).json(rewards);
  } catch (error) {
    console.error('Error fetching rewards:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const redeemReward = async (req, res) => {
  try {
    const { user_id, reward_id } = req.body;

    if (!user_id || !reward_id) {
      return res.status(400).json({ success: false, message: 'user_id and reward_id are required' });
    }

    const reward = await Reward.findById(reward_id);
    if (!reward) {
      return res.status(404).json({ success: false, message: 'Reward not found' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.points < reward.points_required) {
      return res.status(400).json({
        success: false,
        message: 'Not enough points to redeem this reward'
      });
    }

    user.points -= reward.points_required;
    await user.save();

    res.status(200).json({
      success: true,
      new_points_balance: user.points
    });
  } catch (error) {
    console.error('Error redeeming reward:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

