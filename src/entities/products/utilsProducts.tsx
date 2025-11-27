const mapProductCategoryToEmojii: Record<string, string> = {
  Beverages: '🍾',
  Condiments: '🌶️',
  Confections: '🍬',
  'Dairy Products': '🧀',
  'Grains/Cereals': '🌽',
  'Meat/Poultry': '🍗',
  Produce: '🍉',
  Seafood: '🐟',
} as const;

export const getEmojiiByCategoryName = (categoryName: string) => {
  return mapProductCategoryToEmojii[categoryName] ?? '❓';
};
