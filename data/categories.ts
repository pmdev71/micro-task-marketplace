export enum Category {
  DATA_COLLECTION = 'DATA_COLLECTION',
  DATA_LABELING = 'DATA_LABELING',
}

export enum Subcategory {
  TEXT_TRANSCRIPTION = 'TEXT_TRANSCRIPTION',
  DATA_ENTRY = 'DATA_ENTRY',
  IMAGE_ANNOTATION = 'IMAGE_ANNOTATION',
  SENTIMENT_ANALYSIS = 'SENTIMENT_ANALYSIS',
}

// Nested record of categories -> subcategories -> default reward per participant
export const categories: Record<Category, Record<Subcategory, number>> = {
  [Category.DATA_COLLECTION]: {
    [Subcategory.TEXT_TRANSCRIPTION]: 0.2,
    [Subcategory.DATA_ENTRY]: 0.1,
  },
  [Category.DATA_LABELING]: {
    [Subcategory.IMAGE_ANNOTATION]: 0.15,
    [Subcategory.SENTIMENT_ANALYSIS]: 0.05,
  },
};

export const categoryList = Object.values(Category);

export function subcategoriesFor(category: Category): Subcategory[] {
  return Object.keys(categories[category]) as Subcategory[];
}

export function defaultRewardFor(category: Category, subcategory: Subcategory): number {
  return categories[category][subcategory];
}

export function isValidCategory(category: any): category is Category {
  return categoryList.includes(category);
}

export function isValidSubcategory(category: Category, subcategory: any): subcategory is Subcategory {
  return subcategoriesFor(category).includes(subcategory as Subcategory);
}
