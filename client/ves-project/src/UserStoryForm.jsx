import React, { useState, useEffect } from 'react';


const UserStoryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'To Do',
    /*assignee: [],
    reporter: '', // You might want to set the default reporter dynamically based on the current user*/
    priority: 'High',
    storyPoints: 1,
    blocked: false,
    assignees: [],
  });

  const [teams, setTeams] = useState([]); // State to store the list of teams

  useEffect(() => {
    // Fetch the list of teams from your backend API
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5000/teams');
        if (!response.ok) {
          throw new Error(`Error fetching teams: ${response.statusText}`);
        }

        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
        // Handle errors
      }
    };

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
  

  // Inside UserStoryForm component where you handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming you have a function to get selected teams' IDs
      
      // Send a POST request to your backend API to create a new user story
      const response = await fetch('http://localhost:5000/userStories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
  
      // Handle the response accordingly (e.g., show success message)
      if (response.ok) {
        console.log('User story created successfully!');
        // Add logic to redirect or update state as needed
        // fetchData(); // Fetch data after creating a new user story
      } else {
        console.error('Failed to create user story');
        // Handle errors
      }
    } catch (error) {
      console.error('Error creating user story:', error);
      // Handle errors
    }
  
    // Clear the form after submission
    setFormData({
      name: '',
      description: '',
      status: 'To Do',
      priority: 'High',
      storyPoints: 1,
      blocked: false,
      assignees: [],
    });
  
    // Close the form modal
    onClose();
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {/* Add any validation/error messages as needed */}

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        {/* Add any validation/error messages as needed */}

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
          <option value="To Test">To Test</option>
          <option value="Failed">Failed</option>
          <option value="Passed">Passed</option>
        </select>
        {/* Add any validation/error messages as needed */}
      </div>

      <div>
        
        <label>Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {/* Add any validation/error messages as needed */}
      </div>
      

      <div>
        <label>Story Points:</label>
        <input type="number" name="storyPoints" value={formData.storyPoints} onChange={handleChange} />
        {/* Add any validation/error messages as needed */}

        <label>Blocked:</label>
        <select name="blocked" value={formData.blocked} onChange={handleChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>

        {/* Add other fields as needed */}
      </div>

      <div>
        <label>Assignees:</label>
        <select
          name="assignees"
          multiple
          value={formData.assignees}
          onChange={handleChange}
        >
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserStoryForm;