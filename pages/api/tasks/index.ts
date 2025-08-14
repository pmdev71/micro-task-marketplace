import type { NextApiRequest, NextApiResponse } from 'next';
import {
  isValidCategory,
  isValidSubcategory,
  Category,
} from '@/data/categories';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { category, subcategory } = req.body;

  if (!isValidCategory(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const cat = category as Category;
  if (!isValidSubcategory(cat, subcategory)) {
    return res.status(400).json({ error: 'Invalid subcategory' });
  }

  // Placeholder success response
  return res.status(200).json({ ok: true });
}
