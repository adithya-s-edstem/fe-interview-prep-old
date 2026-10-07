import { APP_NAME } from './appName'

export function PageTitle({ pageName }: { pageName: string }) {
  return <title>{`${pageName} · ${APP_NAME}`}</title>
}
