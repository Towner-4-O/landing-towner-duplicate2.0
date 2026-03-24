import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWebOiotData extends Document {
  // Platform Statistics
  totalTrips: string;
  totalUsers: string;
  activeDrivers: string;
  ongoingTrips: string;
  totalDrivers: string;
  completedTrips: string;
  citiesCovered: string;
  partnerCompanies: string;

  // Rider Registration Trends
  totalToday: string;
  approved: string;
  pending: string;
  inProgress: string;

  // Today's Report
  finishedTrips: string;
  todayOngoingTrips: string;
  hailTrips: string;
  nonResponseTrips: string;

  // Achievements
  tripsCompleted: string;
  achievementTotalRiders: string;
  platformUptime: string;
}

const WebOiotDataSchema = new Schema<IWebOiotData>(
  {
    // Platform Statistics
    totalTrips: {
      type: String,
      required: true,
      trim: true,
    },
    totalUsers: {
      type: String,
      required: true,
      trim: true,
    },
    ongoingTrips: {
      type: String,
      required: true,
      trim: true,
    },
    totalDrivers: {
      type: String,
      required: true,
      trim: true,
    },
    completedTrips: {
      type: String,
      required: true,
      trim: true,
    },
    activeDrivers: {
      type: String,
      required: true,
      trim: true,
    },
    citiesCovered: {
      type: String,
      required: true,
      trim: true,
    },
    partnerCompanies: { 
      type: String,
      required: true,
      trim: true,
    },

    // Rider Registration Trends
    totalToday: {
      type: String,
      required: true,
      trim: true,
    },
    approved: {
      type: String,
      required: true,
      trim: true,
    },
    pending: {
      type: String,
      required: true,
      trim: true,
    },
    inProgress: {
      type: String,
      required: true,
      trim: true,
    },

    // Today's Report
    finishedTrips: {
      type: String,
      required: true,
      trim: true,
    },
    todayOngoingTrips: {
      type: String,
      required: true,
      trim: true,
    },
    hailTrips: {
      type: String,
      required: true,
      trim: true,
    },
    nonResponseTrips: {
      type: String,
      required: true,
      trim: true,
    },

    // Achievements
    tripsCompleted: {
      type: String,
      required: true,
      trim: true,
    },
    achievementTotalRiders: {
      type: String,
      required: true,
      trim: true,
    },
    platformUptime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly type the model to avoid union type issues
const WebOiotData: Model<IWebOiotData> = 
  (mongoose.models.WebOiotData as Model<IWebOiotData>) || 
  mongoose.model<IWebOiotData>('WebOiotData', WebOiotDataSchema);

export default WebOiotData;