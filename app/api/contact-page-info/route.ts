import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactPageInfo from "@/models/ContactPageInfo";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get("includeInactive") === "true";
    const filter = includeInactive ? {} : { isActive: true };
    const info = await ContactPageInfo.findOne(filter).sort({ createdAt: -1 });
    return NextResponse.json({ info }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact page info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact page info" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const info = await ContactPageInfo.create(data);
    return NextResponse.json(
      { message: "Contact page info created successfully", info },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact page info:", error);
    return NextResponse.json(
      { error: "Failed to create contact page info" },
      { status: 500 }
    );
  }
}
