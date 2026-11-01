import { masterToolsData } from './tools/master-tools.js';
import { repositoriesData } from './repositories/repositories.js';
import { CATEGORIES } from './categories.js';

// Deduplicate canonical tools by unique id/slug
const toolMap = new Map();
masterToolsData.forEach((tool) => {
  if (!toolMap.has(tool.id)) {
    toolMap.set(tool.id, tool);
  }
});

export const toolsData = Array.from(toolMap.values());
export { repositoriesData, CATEGORIES };

// Helper metrics calculated dynamically
export const directoryStats = {
  totalTools: toolsData.length,
  totalRepositories: repositoriesData.length,
  totalCategories: CATEGORIES.length,
  totalOpenSourceTools: toolsData.filter(t => t.openSource).length,
  totalTrendingTools: toolsData.filter(t => t.trending).length,
  totalTrendingRepos: repositoriesData.filter(r => r.trending).length,
};

export function getToolBySlug(slug) {
  return toolsData.find((t) => t.slug === slug || t.id === slug) || null;
}

export function getRepositoryBySlug(slug) {
  return repositoriesData.find((r) => r.slug === slug || r.id === slug) || null;
}
