import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import NextRequest for type definition

connect();

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
