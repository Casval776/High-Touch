import React from 'react';
import './client/shared/main.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ToDoComponent from './client/pages/ToDoComponent/ToDoComponent';

const App: React.FC = () => {
  return (
    <>
      <Router >
        <Routes>
          <Route caseSensitive={false} path='/todo' element={<ToDoComponent />} />
          <Route path='*' element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
