import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { projectDocToUI } from "@/lib/projectSerialize";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";
    const filter = includeInactive ? {} : { isActive: true };
    const projects = await Project.find(filter).sort({ order: 1 }).lean();
    const list = projects.map((p) => ({
      _id: String(p._id),
      title: p.title,
      type: p.type,
      location: p.location,
      status: p.status,
      image: p.image,
      order: p.order,
      isActive: p.isActive,
    }));
    return NextResponse.json({ projects: list }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const created = await Project.create(data);
    const doc = created.toObject();
    return NextResponse.json(
      {
        message: "Project created successfully",
        project: projectDocToUI(doc as Parameters<typeof projectDocToUI>[0]),
        listItem: {
          _id: String(created._id),
          title: created.title,
          type: created.type,
          location: created.location,
          status: created.status,
          image: created.image,
          order: created.order,
          isActive: created.isActive,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
