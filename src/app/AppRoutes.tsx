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
        <Route path="todo" element={<QuestionPlaceholderPage question={todoQuestion} />} />
        <Route path="search" element={<QuestionPlaceholderPage question={searchQuestion} />} />
        <Route path="register" element={<QuestionPlaceholderPage question={registerQuestion} />} />
        <Route path="table" element={<QuestionPlaceholderPage question={tableQuestion} />} />
        <Route path="auth/*" element={<QuestionPlaceholderPage question={authQuestion} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
