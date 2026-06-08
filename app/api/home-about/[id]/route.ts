import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HomeAboutSection from "@/models/HomeAboutSection";
import { stripMongoFields } from "@/lib/singletonApi";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = stripMongoFields(
      (await request.json()) as Record<string, unknown>
    );

    const content = await HomeAboutSection.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!content) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Home about section updated", content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating home about section:", error);
    return NextResponse.json(
      { error: "Failed to update home about section" },
      { status: 500 }
    );
  }
}
