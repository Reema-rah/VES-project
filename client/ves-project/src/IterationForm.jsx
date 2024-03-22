import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { formatDate } from './utils';

const IterationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
      name: '',
      objective: '',
      userStories: [],
      startDate: '',
      endDate: '',
      assignees: [],
      status: '',
      priority: '',
    });

  const [userStories, setUserStories] = useState([]); // State to store the list of user stories
  const [teams, setTeams] = useState([]); // State to store the list of teams

  useEffect(() => {
    // Fetch the list of user stories from your backend API
    const fetchUserStories = async () => {
      try {
        const userStoriesResponse = await fetch('http://localhost:5000/userStories');
        if (!userStoriesResponse.ok) {
          throw new Error(`Error fetching user stories: ${userStoriesResponse.statusText}`);
        }

        const userStoriesData = await userStoriesResponse.json();
        setUserStories(userStoriesData);
      } catch (error) {
        console.error('Error fetching user stories:', error);
        // Handle errors
      }
    };

    // Fetch the list of teams from your backend API
    const fetchTeams = async () => {
      try {
        const teamsResponse = await fetch('http://localhost:5000/teams');
        if (!teamsResponse.ok) {
          throw new Error(`Error fetching teams: ${teamsResponse.statusText}`);
        }

        const teamsData = await teamsResponse.json();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        // Handle errors
      }
    };

    fetchUserStories();
    fetchTeams();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleChange = (e) => {
    const { name, value, type, checked, selectedOptions } = e.target;
  
    // If the input is a checkbox or multi-select, handle its checked state
    const newValue = type === 'checkbox' ? checked : type === 'select-multiple'
      ? Array.from(selectedOptions).map(option => option.value)
      : value;
  
    setFormData({ ...formData, [name]: newValue });
  };

  const handleUserStoriesChange = (e) => {
    const { options } = e.target;
    const selectedUserStories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({ ...formData, userStories: selectedUserStories });
  };

  const handleAssigneesChange = (e) => {
    const { options } = e.target;
    const selectedAssignees = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({ ...formData, assignees: selectedAssignees });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server
      const response = await fetch('http://localhost:5000/iterations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form data successfully sent to the server
        console.log('Iteration created successfully');
      } else {
        // Handle error from the server
        console.error('Error creating iteration');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear the form after submission
    setFormData({
      name: '',
      objective: '',
      userStories: [],
      startDate: '',
      endDate: '',
      assignees: [],
      status: '',
      priority: '',
    });
     // Close the form modal
     onClose();
  };

  return (
    <div className="modal-content">
      <button className="cloesbtn" onClick={onClose}>
        x
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            objective
          </label>
          <input
            type="text"
            className="form-control"
            id="objective"
            name="objective"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userStories" className="form-label">
            User Stories
          </label>
          <select
            name="userStories"
            multiple
            className="form-control"
            value={formData.userStories}
            onChange={handleUserStoriesChange}
          >
            {userStories.map((userStory) => (
              <option key={userStory._id} value={userStory._id}>
                {userStory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
  <label htmlFor="startDate" className="form-label">
    Start Date
  </label>
  <input
    type="date"
    className="form-control"
    id="startDate"
    name="startDate"
    value={formatDate(formData.startDate)}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label htmlFor="endDate" className="form-label">
    End Date
  </label>
  <input
    type="date"
    className="form-control"
    id="endDate"
    name="endDate"
    value={formatDate(formData.endDate)}
    onChange={handleChange}
  />
</div>

        <div className="mb-3">
          <label htmlFor="assignees" className="form-label">
            Assignees (Teams)
          </label>
          <select
            name="assignees"
            multiple
            className="form-control"
            value={formData.assignees}
            onChange={handleAssigneesChange}
          >
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Start">Start</option>
          <option value="Complete">Complete</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

        <div className="mb-3">
        <label>Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {/* Add any validation/error messages as needed */}
      </div>

        <button type="submit" className="btn btn-primary">
          Create Iteration
        </button>
        <button className="close-button btn btn-danger" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};


export default IterationForm;