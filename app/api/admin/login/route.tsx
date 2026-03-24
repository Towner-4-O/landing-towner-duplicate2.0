import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db.config";
import WebAdmin from "@/app/model/webadmin.model";
import { loginAdminSchema } from "@/app/validations/adminValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sendResponse = (status: number, message: string, data?: any) => {
  return NextResponse.json(
    { success: status < 400, message, data },
    { status }
  );
};

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || "010101";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const { error } = loginAdminSchema.validate({ email, password });
    if (error) {
      return sendResponse(400, error.details[0].message);
    }

    await connectToDatabase();

    const admin = await (WebAdmin as any).findOne({ email });
    if (!admin) {
      return sendResponse(404, "Admin not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return sendResponse(401, "Invalid credentials.");
    }

    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email },
      JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Set the cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          name: admin.name,
          email: admin.email,
          token,
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 3, // 3 days
    });

    return response;

  } catch (error) {
    console.error("Error in admin login API:", error);
    return sendResponse(500, "Internal Server Error");
  }
}
