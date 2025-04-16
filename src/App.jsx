import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import NavBar from './pages/NavBar';
import { GlobalProvider } from "./contexts/GlobalContext";
import TaskDetail from './pages/TaskDetails';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
