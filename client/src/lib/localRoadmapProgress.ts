export function normalizeLocalProgress(values: unknown, validModuleIds: readonly string[]): string[] {
  if (!Array.isArray(values)) return [];
  const available = new Set(validModuleIds);
  return Array.from(new Set(values.filter((value): value is string => typeof value === "string" && available.has(value))));
}

export function toggleLocalProgress(completedModuleIds: readonly string[], moduleId: string): string[] {
  return completedModuleIds.includes(moduleId)
    ? completedModuleIds.filter((id) => id !== moduleId)
    : [...completedModuleIds, moduleId];
}
