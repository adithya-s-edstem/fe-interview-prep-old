export function itemsLeftMessage(activeCount: number) {
  const noun = activeCount === 1 ? 'item' : 'items'
  return `${String(activeCount)} ${noun} left`
}
