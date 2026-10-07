const APP_NAMESPACE = 'fe-prep'

export function persistedStateKey({ feature, version }: { feature: string; version: number }) {
  return `${APP_NAMESPACE}:${feature}:v${String(version)}`
}
