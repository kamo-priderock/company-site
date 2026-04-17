import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CategoryPage from "@/models/CategoryPage";
import { isCategoryPageSlug } from "@/lib/categoryPageSlugs";
import {
  getDefaultCategoryPage,
  mergeCategoryPage,
  type CategoryPagePublic,
} from "@/lib/categoryPageDefaults";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: raw } = await params;
    if (!isCategoryPageSlug(raw)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";
    const filter = includeInactive ? { slug: raw } : { slug: raw, isActive: true };
    let doc = await CategoryPage.findOne(filter).lean();
    if (!doc && !includeInactive) {
      const inactive = await CategoryPage.findOne({ slug: raw }).lean();
      if (inactive && (inactive as { isActive?: boolean }).isActive === false) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
    const page = mergeCategoryPage(raw, doc as Record<string, unknown> | null);
    return NextResponse.json({ page }, { status: 200 });
  } catch (error) {
    console.error("Error fetching category page:", error);
    return NextResponse.json(
      { error: "Failed to fetch category page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: raw } = await params;
    if (!isCategoryPageSlug(raw)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    await dbConnect();
    const rawBody = (await request.json()) as Record<string, unknown>;
    const body = { ...rawBody };
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    const defaults = getDefaultCategoryPage(raw);
    const payload = {
      ...defaults,
      ...body,
      slug: raw,
    };
    delete (payload as { _id?: string })._id;

    const updated = await CategoryPage.findOneAndUpdate(
      { slug: raw },
      { $set: payload },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();

    const page = mergeCategoryPage(
      raw,
      updated as unknown as Record<string, unknown> | null
    );
    return NextResponse.json(
      { message: "Category page saved", page },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving category page:", error);
    return NextResponse.json(
      { error: "Failed to save category page" },
      { status: 500 }
    );
  }
}
