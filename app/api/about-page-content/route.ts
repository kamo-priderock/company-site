import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import AboutPageContent from "@/models/AboutPageContent";
import { ensureAboutPageFromLegacy } from "@/lib/aboutLegacyMigrate";
import { stripMongoFields } from "@/lib/singletonApi";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";
    const filter = includeInactive ? {} : { isActive: true };

    let content = await AboutPageContent.findOne(filter).sort({ createdAt: -1 });
    if (!content) {
      const count = await AboutPageContent.countDocuments();
      if (count === 0) {
        const migrated = await ensureAboutPageFromLegacy();
        if (migrated && (includeInactive || migrated.isActive)) {
          content = migrated;
        }
      } else if (!includeInactive) {
        const inactive = await AboutPageContent.findOne().sort({ createdAt: -1 });
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
    console.error("Error fetching about page content:", error);
    return NextResponse.json(
      { error: "Failed to fetch about page content" },
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

    const existing = await AboutPageContent.findOne().sort({ createdAt: -1 });
    if (existing) {
      const content = await AboutPageContent.findByIdAndUpdate(
        existing._id,
        data,
        { new: true, runValidators: true }
      );
      return NextResponse.json(
        { message: "About page content updated", content },
        { status: 200 }
      );
    }

    const content = await AboutPageContent.create(data);
    return NextResponse.json(
      { message: "About page content created", content },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving about page content:", error);
    return NextResponse.json(
      { error: "Failed to save about page content" },
      { status: 500 }
    );
  }
}
