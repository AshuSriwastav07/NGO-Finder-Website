// Category keywords mapping for matching NGO sectors to categories
// Each category has multiple keywords that will match NGOs to that category

export const categoryKeywords = {
  'Education': [
    'education', 'school', 'learning', 'literacy', 'academic', 'student', 
    'college', 'university', 'teaching', 'teacher', 'scholarship', 'tuition',
    'training', 'skill development', 'vocational training', 'coaching',
    'library', 'books', 'study', 'educational'
  ],
  'Healthcare': [
    'health', 'medical', 'hospital', 'healthcare', 'disease', 'medicine',
    'clinic', 'doctor', 'patient', 'treatment', 'therapy', 'mental health',
    'disability', 'disabled', 'handicapped', 'blind', 'deaf', 'cancer',
    'hiv', 'aids', 'tuberculosis', 'tb', 'malaria', 'diabetes', 'heart',
    'eye care', 'dental', 'nursing', 'pharmacy', 'blood', 'organ donation',
    'rehabilitation', 'physiotherapy', 'healthcare'
  ],
  'Environment': [
    'environment', 'ecology', 'climate', 'green', 'conservation', 'wildlife',
    'forest', 'tree', 'plantation', 'nature', 'sustainable', 'renewable',
    'pollution', 'waste', 'recycling', 'biodiversity', 'ecosystem',
    'carbon', 'solar', 'energy', 'earth', 'organic', 'natural resources'
  ],
  'Women Empowerment': [
    'women', 'woman', 'girl', 'female', 'gender', 'empowerment', 'feminist',
    'maternal', 'mother', 'pregnancy', 'domestic violence', 'dowry',
    'self help group', 'shg', 'mahila', 'ladies', 'widow', 'single mother',
    'women rights', 'girl child', 'female education', 'women welfare'
  ],
  'Child Welfare': [
    'child', 'children', 'kid', 'orphan', 'youth', 'juvenile', 'infant',
    'baby', 'toddler', 'adolescent', 'teen', 'minor', 'childhood',
    'child rights', 'child protection', 'child labour', 'child abuse',
    'adoption', 'foster', 'crèche', 'daycare', 'bal', 'baal'
  ],
  'Animal Rights': [
    'animal', 'pet', 'wildlife', 'cattle', 'bird', 'dog', 'cat', 'cow',
    'veterinary', 'zoo', 'sanctuary', 'shelter', 'stray', 'rescue',
    'species', 'fauna', 'marine', 'fish', 'elephant', 'tiger', 'lion',
    'horse', 'donkey', 'poultry', 'livestock', 'animal welfare', 'spca', 'peta'
  ],
  'Water & Sanitation': [
    'water', 'sanitation', 'hygiene', 'drinking', 'sewage', 'toilet',
    'wash', 'clean water', 'bore well', 'hand pump', 'water supply',
    'drainage', 'swachh', 'cleanliness', 'open defecation', 'latrine',
    'water conservation', 'rainwater', 'groundwater', 'watershed'
  ],
  'Elderly Care': [
    'elderly', 'senior', 'old age', 'aged', 'geriatric', 'pension',
    'retirement', 'grandparent', 'grandmother', 'grandfather', 'vridh',
    'old people', 'senior citizen', 'elder', 'aging', 'old home'
  ],
  'Housing': [
    'housing', 'shelter', 'homeless', 'home', 'slum', 'dwelling',
    'residence', 'accommodation', 'roof', 'construction', 'building',
    'habitat', 'urban', 'rural housing', 'affordable housing', 'awas'
  ],
  'Food Security': [
    'food', 'hunger', 'nutrition', 'meal', 'feeding', 'malnutrition',
    'starvation', 'midday meal', 'annapurna', 'kitchen', 'ration',
    'groceries', 'food distribution', 'community kitchen', 'langar',
    'food bank', 'hunger free', 'akshaya patra'
  ],
  'Livelihood': [
    'livelihood', 'employment', 'skill', 'vocational', 'job', 'income',
    'earning', 'self employment', 'entrepreneurship', 'business',
    'microfinance', 'micro credit', 'loan', 'economic', 'poverty',
    'rural development', 'agriculture', 'farming', 'handicraft', 'artisan',
    'cottage industry', 'small business', 'startup', 'occupation'
  ]
};

/**
 * Check if an NGO's sectors match a given category
 * @param {string} sectors - The sectors string from NGO data (data[8])
 * @param {string} category - The category name to match
 * @returns {boolean} - True if the sectors match the category
 */
export const matchesCategory = (sectors, category) => {
  if (!sectors || !category) return false;
  
  const sectorsLower = sectors.toLowerCase();
  
  // If category is "Others", we need special handling
  if (category === 'Others') {
    // Check if it doesn't match any known category
    return !Object.values(categoryKeywords).some(keywords =>
      keywords.some(keyword => sectorsLower.includes(keyword.toLowerCase()))
    );
  }
  
  const keywords = categoryKeywords[category];
  if (!keywords) {
    // Fallback to simple includes check for unknown categories
    return sectorsLower.includes(category.toLowerCase());
  }
  
  return keywords.some(keyword => sectorsLower.includes(keyword.toLowerCase()));
};

/**
 * Get all matching categories for an NGO's sectors
 * @param {string} sectors - The sectors string from NGO data
 * @returns {string[]} - Array of matching category names
 */
export const getMatchingCategories = (sectors) => {
  if (!sectors) return [];
  
  const matches = [];
  const sectorsLower = sectors.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => sectorsLower.includes(keyword.toLowerCase()))) {
      matches.push(category);
    }
  }
  
  if (matches.length === 0 && sectors.trim()) {
    matches.push('Others');
  }
  
  return matches;
};

/**
 * Count NGOs per category from NGO data array
 * @param {Array} ngoDataArray - Array of [key, data] pairs
 * @returns {Object} - Object with category names as keys and counts as values
 */
export const countNGOsByCategory = (ngoDataArray) => {
  const counts = {};
  
  // Initialize all categories with 0
  Object.keys(categoryKeywords).forEach(cat => counts[cat] = 0);
  counts['Others'] = 0;
  
  ngoDataArray.forEach(([_, data]) => {
    const sectors = data[8] || '';
    const categories = getMatchingCategories(sectors);
    
    categories.forEach(cat => {
      counts[cat] = (counts[cat] || 0) + 1;
    });
  });
  
  return counts;
};
