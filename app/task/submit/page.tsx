'use client';

import { useState } from 'react';
import { Task, selectProofQuestions } from '../../../lib/tasks';

const demoTask: Task = {
  id: 'demo',
  title: 'Demo task',
  proofQuestions: [
    { id: 'q1', text: 'Provide a mandatory proof', isMandatory: true },
    { id: 'q2', text: 'Optional proof one', isMandatory: false },
    { id: 'q3', text: 'Optional proof two', isMandatory: false }
  ]
};

export default function SubmitTaskPage() {
  const questions = selectProofQuestions(demoTask);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [error, setError] = useState('');

  const handleChange = (index: number, value: string) => {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some((a) => !a.trim())) {
      setError('All proof questions require a response.');
      return;
    }
    setError('');
    alert('Submission recorded');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {questions.map((q, i) => (
        <div key={q.id} className="flex flex-col">
          <label className="mb-1">{q.text}</label>
          <input
            type="text"
            value={answers[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            required
            className="border p-2"
          />
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
}
