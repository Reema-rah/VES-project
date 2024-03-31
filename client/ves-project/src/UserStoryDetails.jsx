import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function UserStoryDetails() {
  const { id } = useParams();
  const [userStory, setUserStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [comments, setComments] = useState([]);

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

  const handleCommentSubmit = (text) => {
    const newComment = {
      text: text,
      user: "reyna",
      date: new Date().toLocaleString() // Current date and time
    };
    setComments([...comments, newComment]);
  };

  const handleReplySubmit = (text, parentId) => {
    const newReply = {
      text: text,
      user: "admin",
      date: new Date().toLocaleString() // Current date and time
    };
    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    setComments(updatedComments);
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
  
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space">Close</Link>
  
      {/* Comments Section */}
      <div className="CommentsSection">
        <h2>Comments</h2>
        <CommentForm onSubmit={handleCommentSubmit} />
        <CommentList comments={comments} onReplySubmit={handleReplySubmit} />
      </div>
    </div>
  );
  
}

function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Comment</button>
    </form>
  );
}

function CommentList({ comments, onReplySubmit }) {
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <div>{comment.user} - {comment.date}</div>
          <div>{comment.text}</div>
          {comment.replies && (
            <ul>
              {comment.replies.map(reply => (
                <li key={reply.id}>
                  <div>{reply.user} - {reply.date}</div>
                  <div>{reply.text}</div>
                </li>
              ))}
            </ul>
          )}
          <ReplyForm parentId={comment.id} onSubmit={onReplySubmit} />
        </li>
      ))}
    </ul>
  );
}

function ReplyForm({ parentId, onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text, parentId);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reply..."
      />
      <button type="submit">Reply</button>
    </form>
  );
}

export default UserStoryDetails;
