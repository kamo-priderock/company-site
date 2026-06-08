import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AboutContent from '@/models/AboutContent';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const includeInactive =
      request.nextUrl.searchParams.get('includeInactive') === 'true';
    const filter = includeInactive ? {} : { isActive: true };
    const content = await AboutContent.findOne(filter).sort({ createdAt: -1 });
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

function stripMongoFields<T extends Record<string, unknown>>(raw: T) {
  const data = { ...raw };
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = stripMongoFields(
      (await request.json()) as Record<string, unknown>
    );

    const existing = await AboutContent.findOne().sort({ createdAt: -1 });
    if (existing) {
      const content = await AboutContent.findByIdAndUpdate(
        existing._id,
        data,
        { new: true, runValidators: true }
      );
      return NextResponse.json(
        { message: 'About content updated successfully', content },
        { status: 200 }
      );
    }

    const content = await AboutContent.create(data);

    return NextResponse.json(
      { message: 'About content created successfully', content },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating about content:', error);
    return NextResponse.json(
      { error: 'Failed to create about content' },
      { status: 500 }
    );
  }
}
