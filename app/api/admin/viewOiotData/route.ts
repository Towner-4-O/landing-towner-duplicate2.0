import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db.config";
import WebOiotData from "@/app/model/weboiotdata.model";

const sendResponse = (status: number, message: string, data?: any) => {
  return NextResponse.json(
    { success: status < 400, message, data },
    { status }
  );
};

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const data = await WebOiotData.findOne();
    if (!data) {
      return sendResponse(404, "No data found");
    }

    return sendResponse(200, "Data fetched successfully", data);
  } catch (error: any) {
    console.error("Error in view WebOiotData:", error);
    return sendResponse(500, error.message || "Internal Server Error");
  }
}