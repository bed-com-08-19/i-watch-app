import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import NextRequest for type definition

connect();

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const reqBody = await request.json();
    const { username, email, password, role } = reqBody;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcryptjs.hash(password, 10);
    if (role) user.role = role;

    await user.save();

    return NextResponse.json({ message: "User updated successfully", data: user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
