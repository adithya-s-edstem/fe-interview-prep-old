export interface TodoItemActions {
  rename: (id: string, title: string) => void
  setCompleted: (id: string, completed: boolean) => void
  remove: (id: string) => void
}
