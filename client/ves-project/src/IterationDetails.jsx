/*// Frontend - IterationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from './utils';

function IterationDetails() {
  const { id } = useParams();
  const [iteration, setIteration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIteration = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/iterations/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching iteration details: ${response.statusText}`);
          }
    
          const data = await response.json();
          setIteration(data);
    
          // Extracting ObjectId references from userStories
          const userStoryIds = data.userStories.map(story => story._id);
          setUserStories(userStoryIds);
    
          // Fetch details of user stories associated with the iteration
          const userStoriesDetails = await Promise.all(
            userStoryIds.map(async (storyId) => {
              const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
              if (!storyResponse.ok) {
                throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
              }
              const storyData = await storyResponse.json();
              return storyData.name; // Extracting the name of the user story
            })
          );
    
          setUserStories(userStoriesDetails);

          // Extracting ObjectId references from assignees
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
        console.error('Error fetching iteration details:', error.message);
        setError('Error fetching iteration details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIteration();
  }, [id]);

  const handleEdit = () => {
    navigate(`/iterations/${id}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!iteration) {
    return <div>Iteration not found</div>;
  }

  return (
    <div>
      <h2>Iteration Details</h2>
      <p>Name: {iteration.name || 'N/A'}</p>
      <p>Objective: {iteration.objective || 'N/A'}</p>
      <p>User Stories: {userStories.length > 0 ? userStories.join(', ') : 'N/A'}</p>
      <p>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
      <p>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
      <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      <p>Status: {iteration.status || 'N/A'}</p>
      <p>Priority: {iteration.priority || 'N/A'}</p>

      
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space">Close</Link>
    </div>
  );
}

export default IterationDetails;*/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from './utils';

function IterationDetails() {
  const { id } = useParams();
  const [iteration, setIteration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // State to control the display of the feedback form

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIteration = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/iterations/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching iteration details: ${response.statusText}`);
          }
    
          const data = await response.json();
          setIteration(data);
    
          // Extracting ObjectId references from userStories
          const userStoryIds = data.userStories.map(story => story._id);
          setUserStories(userStoryIds);
    
          // Fetch details of user stories associated with the iteration
          const userStoriesDetails = await Promise.all(
            userStoryIds.map(async (storyId) => {
              const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
              if (!storyResponse.ok) {
                throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
              }
              const storyData = await storyResponse.json();
              return storyData.name; // Extracting the name of the user story
            })
          );
    
          setUserStories(userStoriesDetails);

          // Extracting ObjectId references from assignees
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
        console.error('Error fetching iteration details:', error.message);
        setError('Error fetching iteration details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIteration();
  }, [id]);

  const handleEdit = () => {
    navigate(`/iterations/${id}/edit`);
  };

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(prevState => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!iteration) {
    return <div>Iteration not found</div>;
  }

  return (
    <div>
      <h2>Iteration Details</h2>
      <p>Name: {iteration.name || 'N/A'}</p>
      <p>Objective: {iteration.objective || 'N/A'}</p>
      <p>User Stories: {userStories.length > 0 ? userStories.join(', ') : 'N/A'}</p>
      <p>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
      <p>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
      <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      <p>Status: {iteration.status || 'N/A'}</p>
      <p>Priority: {iteration.priority || 'N/A'}</p>

      {/* Display FeedbackForm when showFeedbackForm is true */}
      {showFeedbackForm && <FeedbackForm onClose={toggleFeedbackForm} />}

      {/* Button to toggle FeedbackForm visibility */}
      <button onClick={toggleFeedbackForm}>Toggle Feedback Form</button>
      
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space">Close</Link>
    </div>
  );
}

export default IterationDetails;

function FeedbackForm({ onClose }) {
  const [formData, setFormData] = useState({
    feedback: '', // Single comment field
    comments: [], // Array to store comments
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Fixed syntax error here
  };

  const handleAddComment = () => {
    const { feedback, comments } = formData;
    if (feedback.trim() !== '') {
      const newComment = {
        text: feedback,
        checked: false, // Checkbox state for the comment
      };
      setFormData({
        ...formData,
        feedback: '', // Clear the feedback field after adding the comment
        comments: [...comments, newComment],
      });
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedComments = formData.comments.map((comment, i) => // Fixed syntax error here
      i === index ? { ...comment, checked: !comment.checked } : comment
    );
    setFormData({ ...formData, comments: updatedComments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your submission logic goes here
    // This function is called when the form is submitted
    // You can send formData to your backend API or perform any other action

    // Clear the form after submission
    setFormData({
      feedback: '',
      comments: [],
    });

    // Close the form modal
    onClose();
  };

  return (
    <div className="modal-content">
      <button className="closebtn" onClick={onClose}></button>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h3>Feedback</h3>
          <label htmlFor="feedback" className="form-label"></label>
          <textarea
            id="feedback"
            name="feedback"
            className="form-control"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add</button>
        <div className="comments">
          {formData.comments.map((comment, index) => (
            <div key={index} className="comment">
              <input
                type="checkbox"
                checked={comment.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <label>{comment.text}</label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
