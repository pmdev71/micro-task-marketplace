'use client';

import { useState } from 'react';
import { Task } from '../../../models/Task';

const deviceOptions = ['desktop', 'mobile', 'tablet'];
const regionOptions = ['NA', 'SA', 'EU', 'AF', 'AS', 'OC'];
const countryOptions = ['US', 'CA', 'GB', 'FR', 'DE', 'IN', 'CN'];

export default function CreateTaskPage() {
  const [allowedDevices, setAllowedDevices] = useState<string[]>([]);
  const [allowedRegions, setAllowedRegions] = useState<string[]>([]);
  const [excludedCountries, setExcludedCountries] = useState<string[]>([]);

  const handleMultiChange = (
    setter: (value: string[]) => void,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setter(values);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const task: Task = {
      id: 'temp-id',
      title: String(formData.get('title') || ''),
      allowedDevices,
      allowedRegions,
      excludedCountries,
    };
    console.log('create task', task);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        name="title"
        placeholder="Task title"
        className="border p-2"
      />

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
