import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FooterContent from "@/models/FooterContent";
import { mergeFooter } from "@/lib/footerDefaults";

function stripMongoFields<T extends Record<string, unknown>>(raw: T) {
  const data = { ...raw };
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";
    const filter = includeInactive ? {} : { isActive: true };
    let doc = await FooterContent.findOne(filter).sort({ createdAt: -1 }).lean();
    if (!doc && !includeInactive) {
      const inactive = await FooterContent.findOne().sort({ createdAt: -1 }).lean();
      if (inactive && (inactive as { isActive?: boolean }).isActive === false) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
    const footer = mergeFooter(doc as Record<string, unknown> | null);
    const id = doc?._id != null ? String(doc._id) : undefined;
    return NextResponse.json({ footer, _id: id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching footer:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = stripMongoFields(
      (await request.json()) as Record<string, unknown>
    );

    const existing = await FooterContent.findOne().sort({ createdAt: -1 });
    if (existing) {
      const updated = await FooterContent.findByIdAndUpdate(
        existing._id,
        data,
        { new: true, runValidators: true }
      ).lean();
      const footer = mergeFooter(updated as Record<string, unknown> | null);
      return NextResponse.json(
        { message: "Footer updated successfully", footer, raw: updated },
        { status: 200 }
      );
    }

    const created = await FooterContent.create(data);
    const footer = mergeFooter(
      created.toObject() as unknown as Record<string, unknown>
    );
    return NextResponse.json(
      { message: "Footer created successfully", footer, raw: created },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving footer:", error);
    return NextResponse.json(
      { error: "Failed to save footer" },
      { status: 500 }
    );
  }
}
