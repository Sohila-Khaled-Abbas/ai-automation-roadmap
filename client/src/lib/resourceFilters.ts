export type ResourceFilterValue = "all" | "video" | "guide" | "notebook" | "course" | "template" | "reference";

export type FilterableLearningResource = {
  title: string;
  description: string;
  provider: string;
  resourceType: string;
  moduleId: string;
  source: string;
};

export function filterLearningResources<T extends FilterableLearningResource>(resources: T[], resourceFilter: ResourceFilterValue, resourceQuery: string): T[] {
  const needle = resourceQuery.trim().toLowerCase();
  return resources.filter((resource) => {
    const matchesType = resourceFilter === "all" || (resourceFilter === "notebook" ? resource.source.includes("Gemini Notebook") : resource.resourceType === resourceFilter);
    const matchesSearch = !needle || [resource.title, resource.description, resource.provider, resource.resourceType, resource.moduleId, resource.source].join(" ").toLowerCase().includes(needle);
    return matchesType && matchesSearch;
  });
}
