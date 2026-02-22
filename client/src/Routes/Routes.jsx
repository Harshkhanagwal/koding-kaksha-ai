import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import PublicRoute from './publicRoutes'
import Login from '../pages/Login'
import DashboardLayout from '../Layouts/DashboardLayout'
import Courses from '../pages/common/Courses/Courses'
import CreateNotes from '../pages/lecturer/create-notes/CreateNotes'
import Questions from '../pages/student/questions/Questions'
import NotesContent from '../pages/common/NotesContent/NotesContent'
import AdminPanel from '../pages/admin/adminPanel/AdminPanel'
import ProblemPanel from '../pages/student/problemPanel/ProblemPanel'
import PracticeIdle from '../pages/student/practiceIDE/PracticeIde'


const AppRoutes = () => {
  return (
    <Routes>

      <Route path='/' element={<PublicRoute>
        <h1>Home</h1>
      </PublicRoute>} />

      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path='/dashboard'
        element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }
      >
        <Route path='admin-panel' element={<AdminPanel />} />
        <Route path='notes' element={<Courses />} />
        <Route path='create-notes' element={<CreateNotes />} />
        <Route path='edit-notes/:id' element={<CreateNotes />} />
        <Route path='questions' element={<Questions />} />
        <Route path='notes/:id' element={<NotesContent></NotesContent>} />
      </Route>

      <Route path='question/:id' element={
        <ProtectedRoutes>
          <ProblemPanel />
        </ProtectedRoutes>
      } />
      <Route path='practice-ide' element={
        <ProtectedRoutes>
          <PracticeIdle />
        </ProtectedRoutes>
      } />

      <Route
        path='*'
        element={
          <h1>404 - Not found</h1>
        }
      />

    </Routes>
  )
}

export default AppRoutes