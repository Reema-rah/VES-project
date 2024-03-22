import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function UserStoryDetails() {
  const { id } = useParams();
  const [userStory, setUserStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignees, setAssignees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStory = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/userStories/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching user story details: ${response.statusText}`);
          }

          const data = await response.json();
          setUserStory(data);

           // Extracting ObjectId references from userStories
           const assigneeIds = data.assignees.map(assignee => assignee._id);
           setAssignees(assigneeIds);
     
           // Fetch details of user stories associated with the iteration
           const assigneesDetails = await Promise.all(
             assigneeIds.map(async (assigneeId) => {
               const assigneeResponse = await fetch(`http://localhost:5000/teams/${assigneeId}`);
               if (!assigneeResponse.ok) {
                 throw new Error(`Error fetching assignee details: ${assigneeResponse.statusText}`);
               }
               const assigneeData = await assigneeResponse.json();
               return assigneeData.name; // Extracting the name of the assignee
             })
           );
     
           setAssignees(assigneesDetails);

        }
      } catch (error) {
        console.error('Error fetching user story details:', error.message);
        setError('Error fetching user story details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStory();
  }, [id]);

  const handleEdit = () => {
    navigate(`/userStories/${id}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userStory) {
    return <div>User Story not found</div>;
  }

  return (
    <div>
      <h2>User Story Details</h2>
      <p>Name: {userStory.name || 'N/A'}</p>
      <p>Description: {userStory.description || 'N/A'}</p>
      <p>Status: {userStory.status || 'N/A'}</p>
      <p>Priority: {userStory.priority || 'N/A'}</p>
      <p>Story Points: {userStory.storyPoints || 'N/A'}</p>
      <p>Blocked: {userStory.blocked ? 'Yes' : 'No'}</p>
      <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      {/* Add other details as needed */}
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space">Close</Link>
      {/* Or use a button with navigate function for closing */}
      {/* <button onClick={() => navigate('/userStories')}>Close</button> */}
    </div>
  );
}

export default UserStoryDetails;