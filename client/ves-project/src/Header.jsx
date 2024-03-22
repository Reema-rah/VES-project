import React from "react";
import {
  BsFillBellFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="menu-icon">
          <BsJustify className="icon" onClick={OpenSidebar} />
        </div>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            id="projectsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Projects
          </button>
          <ul className="dropdown-menu" aria-labelledby="projectsDropdown">
            {/* Add project options here */}
            <li>
              <a className="dropdown-item" href="#">
                Project 1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Project 2
              </a>
            </li>
            {/* Add more projects as needed */}
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            id="tasksDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Tasks
          </button>
          <ul className="dropdown-menu" aria-labelledby="tasksDropdown">
            {/* Add task options here */}
            <li>
              <a className="dropdown-item" href="#">
                Task 1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Task 2
              </a>
            </li>
            {/* Add more tasks as needed */}
          </ul>
        </div>
        {/* <div className='search-box'>
          <BsSearch className='icon' />
          <input type='text' placeholder='Search...' />
        </div> */}
      </div>

      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
