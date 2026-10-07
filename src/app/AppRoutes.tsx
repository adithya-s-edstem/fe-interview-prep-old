import { Route, Routes } from 'react-router'
import { SearchPage } from '../features/search/SearchPage'
import { TodoPage } from '../features/todo/TodoPage'
import { AppLayout } from './AppLayout'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { QuestionPage } from './QuestionPage'
import { QuestionPlaceholderPage } from './QuestionPlaceholderPage'
import { authQuestion, registerQuestion, searchQuestion, tableQuestion, todoQuestion } from './questions'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path={todoQuestion.path}
          element={
            <QuestionPage question={todoQuestion}>
              <TodoPage />
            </QuestionPage>
          }
        />
        <Route
          path={searchQuestion.path}
          element={
            <QuestionPage question={searchQuestion}>
              <SearchPage />
            </QuestionPage>
          }
        />
        <Route path={registerQuestion.path} element={<QuestionPlaceholderPage question={registerQuestion} />} />
        <Route path={tableQuestion.path} element={<QuestionPlaceholderPage question={tableQuestion} />} />
        <Route path={`${authQuestion.path}/*`} element={<QuestionPlaceholderPage question={authQuestion} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
