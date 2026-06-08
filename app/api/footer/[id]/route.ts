import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FooterContent from "@/models/FooterContent";
import { mergeFooter } from "@/lib/footerDefaults";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const raw = await request.json();
    const data = { ...raw };
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await FooterContent.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Footer not found" }, { status: 404 });
    }

    const footer = mergeFooter(
      updated as unknown as Record<string, unknown>
    );
    return NextResponse.json(
      { message: "Footer updated successfully", footer, raw: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating footer:", error);
    return NextResponse.json(
      { error: "Failed to update footer" },
      { status: 500 }
    );
  }
}
