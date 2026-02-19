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


const AppRoutes = () => {
  return (
    <Routes>

      <Route path='/' element={<h1>Home</h1>} />

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
        <Route path='notes' element={<Courses />}> </Route>
        <Route path='create-notes' element={<CreateNotes />}></Route>
        <Route path='edit-notes/:id' element={<CreateNotes />}></Route>
        <Route path='questions' element={<Questions/>}></Route>
        <Route path='notes/:id' element={<NotesContent></NotesContent>}></Route>
      </Route>

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