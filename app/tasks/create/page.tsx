'use client';

import { useState } from 'react';
import {
  Category,
  Subcategory,
  categoryList,
  subcategoriesFor,
  defaultRewardFor,
} from '@/data/categories';

const initialCategory = categoryList[0];
const initialSubcategory = subcategoriesFor(initialCategory)[0];

export default function CreateTaskPage() {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [subcategory, setSubcategory] = useState<Subcategory>(initialSubcategory);
  const [reward, setReward] = useState<number>(
    defaultRewardFor(initialCategory, initialSubcategory),
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Category;
    setCategory(newCategory);
    const subs = subcategoriesFor(newCategory);
    const firstSub = subs[0];
    setSubcategory(firstSub);
    setReward(defaultRewardFor(newCategory, firstSub));
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSub = e.target.value as Subcategory;
    setSubcategory(newSub);
    setReward(defaultRewardFor(category, newSub));
  };

  return (
    <form className="flex flex-col gap-4 p-4 max-w-md">
      <div>
        <label className="block mb-1">Category</label>
        <select
          className="border p-2 w-full"
          value={category}
          onChange={handleCategoryChange}
        >
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Subcategory</label>
        <select
          className="border p-2 w-full"
          value={subcategory}
          onChange={handleSubcategoryChange}
        >
          {subcategoriesFor(category).map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Reward Per Participant</label>
        <input
          type="number"
          step="0.01"
          className="border p-2 w-full"
          value={reward}
          onChange={(e) => setReward(parseFloat(e.target.value))}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        Create Task
      </button>
    </form>
  );
}
