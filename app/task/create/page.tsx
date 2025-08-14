'use client';

import { useState } from 'react';
import {
  Category,
  Subcategory,
  categoryList,
  subcategoriesFor,
} from '@/data/categories';

interface TaskInput {
  title: string;
  category: Category;
  subcategory: Subcategory;
  allowedDevices: string[];
  allowedRegions: string[];
  excludedCountries: string[];
}

const deviceOptions = ['desktop', 'mobile', 'tablet'];
const regionOptions = ['NA', 'SA', 'EU', 'AF', 'AS', 'OC'];
const countryOptions = ['US', 'CA', 'GB', 'FR', 'DE', 'IN', 'CN'];

export default function CreateTaskPage() {
  const [allowedDevices, setAllowedDevices] = useState<string[]>([]);
  const [allowedRegions, setAllowedRegions] = useState<string[]>([]);
  const [excludedCountries, setExcludedCountries] = useState<string[]>([]);
  const [category, setCategory] = useState<Category>(categoryList[0]);
  const [subcategory, setSubcategory] = useState<Subcategory>(
    subcategoriesFor(categoryList[0])[0]
  );

  const handleMultiChange = (
    setter: (value: string[]) => void,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setter(values);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value as Category;
    setCategory(cat);
    const subs = subcategoriesFor(cat);
    setSubcategory(subs[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const task: TaskInput = {
      title: String(formData.get('title') || ''),
      category,
      subcategory,
      allowedDevices,
      allowedRegions,
      excludedCountries,
    };
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        name="title"
        placeholder="Task title"
        className="border p-2"
      />

      <label className="font-bold">Category</label>
      <select value={category} onChange={handleCategoryChange} className="border p-2">
        {categoryList.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label className="font-bold">Subcategory</label>
      <select
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value as Subcategory)}
        className="border p-2"
      >
        {subcategoriesFor(category).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <label className="font-bold">Allowed Devices</label>
      <select
        multiple
        value={allowedDevices}
        onChange={(e) => handleMultiChange(setAllowedDevices, e)}
        className="border p-2 h-32"
      >
        {deviceOptions.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <label className="font-bold">Allowed Regions</label>
      <select
        multiple
        value={allowedRegions}
        onChange={(e) => handleMultiChange(setAllowedRegions, e)}
        className="border p-2 h-32"
      >
        {regionOptions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <label className="font-bold">Excluded Countries</label>
      <select
        multiple
        value={excludedCountries}
        onChange={(e) => handleMultiChange(setExcludedCountries, e)}
        className="border p-2 h-32"
      >
        {countryOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Task
      </button>
    </form>
  );
}
