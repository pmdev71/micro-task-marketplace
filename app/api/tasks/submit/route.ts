import { NextRequest, NextResponse } from 'next/server';
import { Task } from '@/types/task';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg'];

export async function POST(req: NextRequest) {
  const { task, screenshots } = (await req.json()) as {
    task: Task;
    screenshots: { mime: string }[];
  };

  const requirements = task?.screenshotRequirements;
  if (!requirements) {
    return NextResponse.json(
      { error: 'Missing screenshot requirements' },
      { status: 400 }
    );
  }

  const { count } = requirements;
  if (typeof count !== 'number' || count < 0 || count > 2) {
    return NextResponse.json({ error: 'Invalid screenshot count' }, { status: 400 });
  }

  if (!Array.isArray(screenshots) || screenshots.length !== count) {
    return NextResponse.json(
      { error: 'Incorrect number of screenshots' },
      { status: 400 }
    );
  }

  for (const file of screenshots) {
    if (!ALLOWED_MIME_TYPES.includes(file.mime)) {
      return NextResponse.json(
        { error: 'Unsupported screenshot type' },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
