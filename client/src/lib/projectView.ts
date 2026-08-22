import type { BuildChallenge } from "./roadmapData";

export type PersistedRoadmapProject = {
  id: number;
  slug: string;
  moduleId: string;
  route: string;
  level: string;
  title: string;
  summary: string;
  recipeJson: string;
  proof: string;
  templateLabel: string;
  templateUrl: string;
  provider: string;
  source: string;
  sortOrder: number;
};

function parseRecipe(recipeJson: string): string[] {
  try {
    const value: unknown = JSON.parse(recipeJson);
    if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value;
  } catch {
    // Invalid persisted project recipes should degrade to a visible empty list, not break the public build studio.
  }
  return [];
}

export function toBuildChallenges(projects: PersistedRoadmapProject[]): BuildChallenge[] {
  return [...projects]
    .sort((first, second) => first.sortOrder - second.sortOrder)
    .map((project) => ({
      id: project.slug,
      moduleId: project.moduleId,
      route: project.route,
      level: project.level,
      title: project.title,
      summary: project.summary,
      recipe: parseRecipe(project.recipeJson),
      proof: project.proof,
      templateLabel: project.templateLabel,
      templateUrl: project.templateUrl,
      provider: project.provider,
      source: project.source,
    }));
}
