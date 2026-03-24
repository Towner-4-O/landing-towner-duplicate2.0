import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db.config";
import WebTownerData from "@/app/model/webtownerdata.model";

const sendResponse = (status: number, message: string, data?: any) => {
  return NextResponse.json(
    { success: status < 400, message, data },
    { status }
  );
};

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await req.json();

    // Find if any document exists - pass empty filter
    const existingData = await WebTownerData.findOne({}).exec();

    if (existingData) {
      // Update existing document
      const updatedData = await WebTownerData.findByIdAndUpdate(
        existingData._id,
        formData,
        { new: true, runValidators: true }
      ).exec();
      return sendResponse(200, "Data updated successfully", updatedData);
    } else {
      // Create new document
      const newData = new WebTownerData(formData);
      await newData.save();
      return sendResponse(201, "Data created successfully", newData);
    }
  } catch (error: any) {
    console.error("Error in updateTowData:", error);
    return sendResponse(500, error.message || "Internal Server Error");
  }
}