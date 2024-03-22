import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserStoryDetails from './UserStoryDetails';
import IterationDetails from './IterationDetails';
import ReleaseDetails from './ReleaseDetails';
import Header from './Header';
import Sidebar from './Sidebar';
import UserStoryForm from './UserStoryForm';
import IterationForm from './IterationForm';
import ReleaseForm from './ReleaseForm';
import Space from './Space';
import Lists from './pages/Lists';
import Progress from './pages/Progress';
import Reports from './pages/Reports';
import Team from './pages/Team';
import Setting from './pages/Setting';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
        <Route path='/' element={<Space />} />
          <Route path='/space' element={<Space />} />
          <Route path='/userStories/:id' element={<UserStoryDetails />} />
          <Route path='/iterations/:id' element={<IterationDetails />} />
          <Route path='/releases/:id' element={<ReleaseDetails />} />
          <Route path='/userstoryform' element={<UserStoryForm />} />
          <Route path='/iterationform' element={<IterationForm />} />
          <Route path='/releaseForm' element={<ReleaseForm />} />
          <Route path='/lists' element={<Lists />} />
          <Route path='/progress' element={<Progress />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/team' element={<Team />} />
          <Route path='/team/:id' element={<Team />} />
          <Route path='/setting' element={<Setting />} />
        </Routes>
      </div>
    </Router>


  );
}

export default App;