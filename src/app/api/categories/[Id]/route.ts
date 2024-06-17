//pages/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";

// DELETE: Delete a category by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connect();
  try {
    const { id } = params;
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
