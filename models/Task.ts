import mongoose, { Schema, Document, Model } from 'mongoose';
import { Category, Subcategory } from '@/data/categories';

export interface ITask extends Document {
  title: string;
  category: Category;
  subcategory: Subcategory;
  reward: number;
  allowedDevices: string[];
  allowedRegions: string[];
  excludedCountries: string[];
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  category: { type: String, enum: Object.values(Category), required: true },
  subcategory: { type: String, enum: Object.values(Subcategory), required: true },
  reward: { type: Number, required: true },
  allowedDevices: [{ type: String }],
  allowedRegions: [{ type: String }],
  excludedCountries: [{ type: String }],
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
export type { Category, Subcategory };
