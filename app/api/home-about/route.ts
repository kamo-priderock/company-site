import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HomeAboutSection from "@/models/HomeAboutSection";
import { ensureHomeAboutFromLegacy } from "@/lib/aboutLegacyMigrate";
import { stripMongoFields } from "@/lib/singletonApi";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";
    const filter = includeInactive ? {} : { isActive: true };

    let content = await HomeAboutSection.findOne(filter).sort({ createdAt: -1 });
    if (!content) {
      const count = await HomeAboutSection.countDocuments();
      if (count === 0) {
        const migrated = await ensureHomeAboutFromLegacy();
        if (migrated && (includeInactive || migrated.isActive)) {
          content = migrated;
        }
      } else if (!includeInactive) {
        const inactive = await HomeAboutSection.findOne().sort({ createdAt: -1 });
        if (inactive && inactive.isActive === false) {
          return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
      }
    }

    const id = content?._id != null ? String(content._id) : undefined;
    return NextResponse.json(
      { content: content ?? null, _id: id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching home about section:", error);
    return NextResponse.json(
      { error: "Failed to fetch home about section" },
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

    const existing = await HomeAboutSection.findOne().sort({ createdAt: -1 });
    if (existing) {
      const content = await HomeAboutSection.findByIdAndUpdate(
        existing._id,
        data,
        { new: true, runValidators: true }
      );
      return NextResponse.json(
        { message: "Home about section updated", content },
        { status: 200 }
      );
    }

    const content = await HomeAboutSection.create(data);
    return NextResponse.json(
      { message: "Home about section created", content },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving home about section:", error);
    return NextResponse.json(
      { error: "Failed to save home about section" },
      { status: 500 }
    );
  }
}
