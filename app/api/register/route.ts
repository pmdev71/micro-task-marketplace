import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }
  await dbConnect();
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  return NextResponse.json({ id: user._id, email: user.email });
}
