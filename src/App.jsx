import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { QueryProvider } from './context/QueryContext'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

function App() {
  return (
    <QueryProvider>
      <Router>
        <div className='d-flex flex-column min-vh-100'>
          <main className='flex-grow-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryProvider>
  )
}

export default App
