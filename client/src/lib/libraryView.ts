import { filterLearningResources, type ResourceFilterValue } from "@/lib/resourceFilters";

export type LibraryResource = {
  moduleId: string;
  title: string;
  description: string;
  provider: string;
  source: string;
  resourceType: "course" | "guide" | "template" | "reference" | "video";
};

export function filterLibraryView<T extends LibraryResource>(resources: T[], filter: ResourceFilterValue, query: string, moduleId: string): T[] {
  return filterLearningResources(resources, filter, query).filter((resource) => moduleId === "all" || resource.moduleId === moduleId);
}

export function visibleLibraryResources<T>(resources: T[], limit: number): T[] {
  return resources.slice(0, Math.max(0, limit));
}
