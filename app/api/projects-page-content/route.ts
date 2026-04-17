import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectsPageContent from "@/models/ProjectsPageContent";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const content = await ProjectsPageContent.findOne({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects page content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects page content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, description, heroImage } = body;

    // Find existing content or create new
    let content = await ProjectsPageContent.findOne({ isActive: true });
    
    if (content) {
      content.title = title;
      content.description = description;
      content.heroImage = heroImage;
      await content.save();
    } else {
      content = await ProjectsPageContent.create({
        title,
        description,
        heroImage,
        isActive: true,
      });
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error('Error updating projects page content:', error);
    return NextResponse.json(
      { error: 'Failed to update projects page content' },
      { status: 500 }
    );
  }
}
