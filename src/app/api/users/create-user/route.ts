import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { NextRequest } from "next/server"; // Import NextRequest for type definition

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, role } = reqBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully", data: newUser }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
