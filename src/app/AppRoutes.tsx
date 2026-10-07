import { Route, Routes } from 'react-router'
import { AppLayout } from './AppLayout'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { QuestionPlaceholderPage } from './QuestionPlaceholderPage'
import { authQuestion, registerQuestion, searchQuestion, tableQuestion, todoQuestion } from './questions'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={todoQuestion.path} element={<QuestionPlaceholderPage question={todoQuestion} />} />
        <Route path={searchQuestion.path} element={<QuestionPlaceholderPage question={searchQuestion} />} />
        <Route path={registerQuestion.path} element={<QuestionPlaceholderPage question={registerQuestion} />} />
        <Route path={tableQuestion.path} element={<QuestionPlaceholderPage question={tableQuestion} />} />
        <Route path={`${authQuestion.path}/*`} element={<QuestionPlaceholderPage question={authQuestion} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
