import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebTownerData extends Document {
  // Platform Statistics
  totalTrips: string;
  activeDrivers: string;
  ongoingTrips: string;
  totalDrivers: string;
  completedTrips: string;
  citiesCovered: string;
  driverEarnings: string;
  registrationCount: string;
  earningsChanged: string;

  // Driver Registration Trends
  totalToday: string;
  approved: string;
  pending: string;
  inProgress: string;

  // City Statistics
  cityOne: string;
  cityOneTotalTrip: string;
  cityOneActiveDrivers: string;
  cityOneCompletedTrips: string;

  cityTwo: string;
  cityTwoTotalTrip: string;
  cityTwoActiveDrivers: string;
  cityTwoCompletedTrips: string;

  cityThree: string;
  cityThreeTotalTrip: string;
  cityThreeActiveDrivers: string;
  cityThreeCompletedTrips: string;

  // Today's Report
  finishedTrips: string;
  todayOngoingTrips: string;
  hailTrips: string;
  nonResponseTrips: string;

  // Achievements
  tripsCompleted: string;
  achievementTotalDrivers: string;
  platformUptime: string;
}

const WebTownerDataSchema = new Schema<IWebTownerData>(
  {
    // Platform Statistics
    totalTrips: {
      type: String,
      required: true,
      trim: true,
    },
    activeDrivers: {
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
    citiesCovered: {
      type: String,
      required: true,
      trim: true,
    },
    driverEarnings: {
      type: String,
      required: true,
      trim: true,
    },
    registrationCount: {
      type: String,
      required: true,
      trim: true,
    },
    earningsChanged: {
      type: String,
      required: true,
      trim: true,
    },

    // Driver Registration Trends
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

    // City Statistics
    cityOne: {
      type: String,
      required: true,
      trim: true,
    },
    cityOneTotalTrip: {
      type: String,
      required: true,
      trim: true,
    },
    cityOneActiveDrivers: {
      type: String,
      required: true,
      trim: true,
    },
    cityOneCompletedTrips: {
      type: String,
      required: true,
      trim: true,
    },

    cityTwo: {
      type: String,
      required: true,
      trim: true,
    },
    cityTwoTotalTrip: {
      type: String,
      required: true,
      trim: true,
    },
    cityTwoActiveDrivers: {
      type: String,
      required: true,
      trim: true,
    },
    cityTwoCompletedTrips: {
      type: String,
      required: true,
      trim: true,
    },

    cityThree: {
      type: String,
      required: true,
      trim: true,
    },
    cityThreeTotalTrip: {
      type: String,
      required: true,
      trim: true,
    },
    cityThreeActiveDrivers: {
      type: String,
      required: true,
      trim: true,
    },
    cityThreeCompletedTrips: {
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
    achievementTotalDrivers: {
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
const WebTownerData: Model<IWebTownerData> =
  (mongoose.models.WebTownerData as Model<IWebTownerData>) ||
  mongoose.model<IWebTownerData>("WebTownerData", WebTownerDataSchema);

export default WebTownerData;