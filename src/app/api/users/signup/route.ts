import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if the user exists or not
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" }, // Consider using consistent error messages ("Exists" vs "Exist")
        { status: 400 }

      );
    }
    
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully", // Minor wording adjustment
      success: true,
      user: savedUser, // Renamed from `savedUser` to `user` for consistency
    });
  } catch (error: any) {
    console.error("User registration error:", error); // Consider logging the error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Improved error message
  }
}
