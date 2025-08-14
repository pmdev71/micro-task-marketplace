import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import {
  isValidCategory,
  isValidSubcategory,
  Category,
  Subcategory,
  defaultRewardFor,
} from '@/data/categories';

export async function GET() {
  await dbConnect();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const {
    title,
    category,
    subcategory,
    allowedDevices = [],
    allowedRegions = [],
    excludedCountries = [],
  } = await req.json();

  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  if (!isValidCategory(category) || !isValidSubcategory(category as Category, subcategory)) {
    return NextResponse.json({ error: 'Invalid category or subcategory' }, { status: 400 });
  }

  const cat = category as Category;
  const sub = subcategory as Subcategory;
  const reward = defaultRewardFor(cat, sub);

  await dbConnect();
  const task = await Task.create({
    title,
    category: cat,
    subcategory: sub,
    reward,
    allowedDevices,
    allowedRegions,
    excludedCountries,
  });
  return NextResponse.json(task, { status: 201 });
}
