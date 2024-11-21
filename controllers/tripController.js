import Trip from '../models/Trip.js';
import User from '../models/User.js';

export const startTrip = async (req, res) => {
  try {
    const { user_id, start_location, start_time } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new trip entry
    const newTrip = new Trip({
      user_id,
      start_location,
      start_time,
      end_location: '', // End location is empty initially
      end_time: null, // End time is null initially
      distance: 0, // Distance will be calculated later
      speed_data: [], // Empty array to store speed data
      points_earned: 0, // Points to be calculated later
    });

    const savedTrip = await newTrip.save();

    res.status(201).json({ trip_id: savedTrip._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const endTrip = async (req, res) => {
  try {
    const { trip_id, end_location, end_time, speed_data } = req.body;

    const trip = await Trip.findById(trip_id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const distance = calculateDistance(trip.start_location, end_location); 
    const points_earned = calculatePoints(distance, speed_data);

    trip.end_location = end_location;
    trip.end_time = end_time;
    trip.distance = distance;
    trip.speed_data = speed_data;
    trip.points_earned = points_earned;

    await trip.save();

    res.status(200).json({ points_earned });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripHistory = async (req, res) => {
  try {
    const { user_id } = req.query;

    const trips = await Trip.find({ user_id });

    const tripHistory = trips.map(trip => ({
      trip_id: trip._id,
      start_location: trip.start_location,
      end_location: trip.end_location,
      distance: trip.distance,
      points_earned: trip.points_earned,
    }));

    res.status(200).json(tripHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const calculateDistance = (start_location, end_location) => {
  return Math.random() * 100; 
};

const calculatePoints = (distance, speed_data) => {
  let points = 0;

  points += Math.floor(distance);

  speed_data.forEach(speed => {
    if (speed > 50) {
      points += 5; 
    }
  });

  return points;
};
