//pages/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";

// GET: Fetch all categories
export async function GET(req: NextRequest) {
  await connect();
  try {
    const categories = await Category.find();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Add a new category
export async function POST(req: NextRequest) {
  await connect();
  try {
    const { name } = await req.json();
    const newCategory = new Category({ name });
    await newCategory.save();
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
