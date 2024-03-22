import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
         Project1
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>x</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/space">
            <BsGrid1X2Fill className='icon' /> Space
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/lists">
            <BsFillArchiveFill className='icon' /> Lists
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/progress">
            <BsFillGrid3X3GapFill className='icon' /> Progress
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/reports">
            <BsMenuButtonWideFill className='icon' /> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/team">
            <BsPeopleFill className='icon' /> Team
          </Link>
        </li>
        <li className='sidebar-list-item setting'>
          <Link to="/setting">
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;