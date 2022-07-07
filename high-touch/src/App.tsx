import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Components
import ToDoComponent from './client/pages/ToDoComponent/ToDoComponent';

// CSS
import './client/shared/main.scss';

const App: React.FC = () => {
  return (
    <>
      <h1>Steve's Planner</h1>
      <Router >
        <Routes>
          <Route caseSensitive={false} path='/' element={<ToDoComponent />} />
          <Route path='*' element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
