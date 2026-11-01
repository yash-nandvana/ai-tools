import { toolsData, repositoriesData, CATEGORIES } from '@/data';

export default function sitemap() {
  const baseUrl = 'https://devatlas.dev';

  const staticRoutes = [
    '',
    '/tools',
    '/repositories',
    '/categories',
    '/trending',
    '/research',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const toolRoutes = toolsData.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug || tool.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const repoRoutes = repositoriesData.map((repo) => ({
    url: `${baseUrl}/repositories/${repo.slug || repo.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...repoRoutes];
}
