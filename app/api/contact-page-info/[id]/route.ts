import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactPageInfo from "@/models/ContactPageInfo";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const info = await ContactPageInfo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!info) {
      return NextResponse.json({ error: "Contact page info not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Contact page info updated successfully", info },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact page info:", error);
    return NextResponse.json(
      { error: "Failed to update contact page info" },
      { status: 500 }
    );
  }
}
