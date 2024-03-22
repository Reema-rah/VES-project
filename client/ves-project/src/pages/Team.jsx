import React, { useState } from 'react';

const Team = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    objective: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server
      const response = await fetch('http://localhost:5000/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form data successfully sent to the server
        console.log('Team created successfully');
      } else {
        // Handle error from the server
        console.error('Error creating team');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear the form after submission
    setFormData({
      name: '',
      objective: '',
    });

  };

  return (
    <>
      <div>
        <h1>Team page</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div>
          <label>Objective:</label>
          <input
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            required
          />
          </div>

          <button type="submit">Create Team</button>
        </form>
      </div>
    </>
  );
};

export default Team;