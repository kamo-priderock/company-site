import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AboutPageContent from "@/models/AboutPageContent";
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

    const content = await AboutPageContent.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!content) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "About page content updated", content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating about page content:", error);
    return NextResponse.json(
      { error: "Failed to update about page content" },
      { status: 500 }
    );
  }
}
