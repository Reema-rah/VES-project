import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import Modal from "./Modal";
import UserStoryForm from "./UserStoryForm";
import IterationForm from "./IterationForm";
import ReleaseForm from "./ReleaseForm";
import { BsSearch } from "react-icons/bs";
// import Filter from "./Filter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Main component for the Space page
function Space() {
  // State variables to manage the state of modals and data
  const [userStoryFormOpen, setUserStoryFormOpen] = useState(false);
  const [iterationFormOpen, setIterationFormOpen] = useState(false);
  const [releaseFormOpen, setReleaseFormOpen] = useState(false);

  const [userStories, setUserStories] = useState([]);
  const [iterations, setIterations] = useState([]);
  const [releases, setReleases] = useState([]);

  
  
  // React Router hook for navigation
  const navigate = useNavigate();

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStoriesResponse = await fetch(
          "http://localhost:5000/userStories"
        );
        const iterationsResponse = await fetch(
          "http://localhost:5000/iterations"
        );
        const releasesResponse = await fetch("http://localhost:5000/releases");

        const userStoriesData = await userStoriesResponse.json();
        const iterationsData = await iterationsResponse.json();
        const releasesData = await releasesResponse.json();

        setUserStories(userStoriesData);
        setIterations(iterationsData);
        setReleases(releasesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully (could show a message to the user)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const userStoriesResponse = await fetch(
        "http://localhost:5000/userStories"
      );
      const iterationsResponse = await fetch(
        "http://localhost:5000/iterations"
      );
      const releasesResponse = await fetch("http://localhost:5000/releases");

      const userStoriesData = await userStoriesResponse.json();
      const iterationsData = await iterationsResponse.json();
      const releasesData = await releasesResponse.json();

      setUserStories(userStoriesData);
      setIterations(iterationsData);
      setReleases(releasesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error gracefully (could show a message to the user)
    }
  };

  // Function to toggle the user story form modal and fetch data after closing
  const handleUserStoryFormToggle = async () => {
    setUserStoryFormOpen(!userStoryFormOpen);

    // Wait for the user story form to close (assuming it closes after submitting)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay if needed

    // Fetch data again after closing the user story form
    fetchData();
  };

  // Function to toggle the iteration form modal and fetch data after closing
  const handleIterationFormToggle = async () => {
    setIterationFormOpen(!iterationFormOpen);

    // Wait for the iteration form to close (assuming it closes after submitting)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch data again after closing the iteration form
    fetchData();
  };

  // Function to toggle the release form modal and fetch data after closing
  const handleReleaseFormToggle = async () => {
    setReleaseFormOpen(!releaseFormOpen);

    // Wait for the release form to close (assuming it closes after submitting)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch data again after closing the release form
    fetchData();
  };

  const handleDeleteUserStory = async (userId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user story?"
    );

    if (confirmDelete) {
      try {
        // Send delete request to the server
        const response = await fetch(
          `http://localhost:5000/userStories/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("User story deleted successfully");
          // Fetch data again after deleting
          fetchData();
        } else {
          console.error("Error deleting user story");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteIteration = async (iterationId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this iteration?"
    );

    if (confirmDelete) {
      try {
        // Send delete request to the server
        const response = await fetch(
          `http://localhost:5000/iterations/${iterationId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Iteration deleted successfully");
          // Fetch data again after deleting
          fetchData();
        } else {
          console.error("Error deleting iteration");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteRelease = async (releaseId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this release?"
    );

    if (confirmDelete) {
      try {
        // Send delete request to the server
        const response = await fetch(
          `http://localhost:5000/releases/${releaseId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Release deleted successfully");
          // Fetch data again after deleting
          fetchData();
        } else {
          console.error("Error deleting release");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEditUserStory = (userId) => {
    // Navigate to the edit page or open a modal for editing
    // You can implement this based on your preference
    // For simplicity, let's navigate to a new edit page
    navigate(`/userStories/${userId}/edit`);
  };

  const handleEditIteration = (iterationId) => {
    // Navigate to the edit page or open a modal for editing
    // You can implement this based on your preference
    // For simplicity, let's navigate to a new edit page
    navigate(`/iterations/${iterationId}/edit`);
  };

  const handleEditRelease = (releaseId) => {
    // Navigate to the edit page or open a modal for editing
    // You can implement this based on your preference
    // For simplicity, let's navigate to a new edit page
    navigate(`/releases/${releaseId}/edit`);
  };

  // Sample data for the charts
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];
  // const [iterSearch, setIterSearch] = useState([]);
  // const fakeData = [
  //   { _id: 1, name: "reema", objective: "kkkk" },
  //   { _id: 2, name: "meow", objective: "why" },
  //   { _id: 3, name: "hii", objective: "woop woop" },
  //   { _id: 4, name: "funny", objective: "reac" },
  // ];
  // const iterResult = (value) => {
  //   setIterSearch(value);
  // };
  // const results = fakeData.filter((item) => {
  //   return e != "" ? item.name.includes(e) : "";
  // });
  // console.log(iterSearch)
  // JSX for the Space component
  
  // const [cards, setcards] = useState([
  //   // Initialize your card data here
  //   { id: 1, category: "User Story", name: "Card 1" },
  //   { id: 2, category: "Iteration", name: "Card 2" },
  //   { id: 3, category: "Release", name: "Card 3" },
  //   // Add more cards as needed
  // ]);



















    const [selectedFilters, setSelectedFilters] = useState(["All"]);
  
    let filters = ["All", "User Story", "Iteration", "Release"];
  
    const handleFilterButtonClick = (selectedCategory) => {
      if (selectedFilters.includes(selectedCategory)) {
        setSelectedFilters(selectedFilters.filter((el) => el !== selectedCategory));
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
    };


    const [iterSearch, setIterSearch] = useState([]);
    const [userSearch, setUserSearch] = useState([]);
    const [releaseSearch, setRelSearch] = useState([]);



    
  return (
    <main className="main-container">
      {/* Modal for User Story Form */}
      {userStoryFormOpen && (
        <Modal onClose={handleUserStoryFormToggle}>
          <UserStoryForm onClose={handleUserStoryFormToggle} />
        </Modal>
      )}
      {/* Modal for Iteration Form */}
      {iterationFormOpen && (
        <Modal onClose={handleIterationFormToggle}>
          <IterationForm onClose={handleIterationFormToggle} />
        </Modal>
      )}
      {/* Modal for Release Form */}
      {releaseFormOpen && (
        <Modal onClose={handleReleaseFormToggle}>
          <ReleaseForm onClose={handleReleaseFormToggle} />
        </Modal>
      )}
      {/* Dashboard Title */}
      <div className="main-title">
        <h3>DASHBOARD</h3>

        {/* <Filter cards={cards}/> */}
        {/***********************************************/}


      <div>
        <div className="buttons-container">
          {filters.map((category, idx) => (
            <button
              onClick={() => handleFilterButtonClick(category)}
              className={`button ${selectedFilters.includes(category) ? "active" : ""}`}
              key={`filters-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
{/* {console.log(filteredCards.map((j) => j[0]))} */}

        {/**************************************************/}

      </div>
      {/* User Stories Card */}
      <div className="main-cards">
        {selectedFilters.includes("User Story") || selectedFilters.includes("All") ?
        <div className="card">
          <div className="search-box">
            <BsSearch className="icon" />
            <input type="text" placeholder="Search..." 
            
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
            
            />
            
          </div>
          <div className="card-inner">
            <h3>User Stories</h3>
            {/* Button to open User Story Form */}
            <FaSquarePlus
              className="card_icon"
              onClick={handleUserStoryFormToggle}
            />
          </div>
          
          {/* List of User Stories */}
          <ul>
            {userStories.map((userStory) => (
              userStory.name.includes(userSearch)?
              <li key={userStory._id}>
                {/* Link to User Story Details */}
                <Link
                  to={`/userStories/${userStory._id}`}
                  onClick={() => navigate(`/userStories/${userStory._id}`)}>
                  {`${userStory.name} - ${userStory.description}`}
                </Link>
                {/* Add Delete Icon */}
                <span onClick={() => handleDeleteUserStory(userStory._id)}>
                  ًں—‘
                </span>
                {/* Add Edit Icon */}
                <span onClick={() => handleEditUserStory(userStory._id)}>
                  âœڈ
                </span>
              </li>
              :
              ""
            ))}
          </ul>
        </div>
        : ""}
        {selectedFilters.includes("Iteration") || selectedFilters.includes("All")?
        <div className="card">
          <div>
            <div className="search-box">
              <BsSearch className="icon" />
              <input
                type="text"
                onChange={(e) => {
                  setIterSearch(e.target.value);
                }}
                placeholder="Search..."
              />
            </div>
            {/* here */}
          </div>
          <div className="card-inner">
            <h3>Iteration</h3>
            {/* Button to open Iteration Form */}
            <FaSquarePlus
              className="card_icon"
              onClick={handleIterationFormToggle}
            />
          </div>
          {/* List of Iterations */}
          <ul>
            {iterations.map((iteration) => (
              iteration.name.includes(iterSearch)?
              <li key={iteration._id}>
                {/* Link to Iteration Details */}
                <Link
                  to={`/iterations/${iteration._id}`}
                  onClick={() => navigate(`/iterations/${iteration._id}`)}>
                  {`${iteration.name} - ${iteration.objective}`}
                </Link>
                {/* Add Delete Icon */}
                <span onClick={() => handleDeleteIteration(iteration._id)}>
                  ًں—‘
                </span>
                {/* Add Edit Icon */}
                <span onClick={() => handleEditIteration(iteration._id)}>
                  âœڈ
                </span>
              </li>
              :
              ""
            ))}
          </ul>
        </div>
        : ""}
        {selectedFilters.includes("Release") || selectedFilters.includes("All")?
        <div className="card">
          <div className="search-box">
            <BsSearch className="icon" />
            <input type="text" placeholder="Search..." 
            
            onChange={(e) => {
              setRelSearch(e.target.value);
            }}
            
            />
          </div>
          <div className="card-inner">
            <h3>Release</h3>
            {/* Button to open Release Form */}
            <FaSquarePlus
              className="card_icon"
              onClick={handleReleaseFormToggle}
            />
          </div>
          {/* List of Releases */}
          <ul>
            {releases.map((release) => (
              release.name.includes(releaseSearch)?
              <li key={release._id}>
                {/* Link to Release Details */}
                <Link
                  to={`/releases/${release._id}`}
                  onClick={() => navigate(`/releases/${release._id}`)}>
                  {`${release.name} - ${release.objective}`}
                </Link>
                {/* Add Delete Icon */}
                <span onClick={() => handleDeleteRelease(release._id)}>ًں—‘</span>
                {/* Add Edit Icon */}
                <span onClick={() => handleEditRelease(release._id)}>âœڈ</span>
              </li>
              :
              ""
            ))}
          </ul>
        </div>
        : ""
        }
      </div>
      {/* Charts */}
      <div className="charts">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        {/* Line Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Space;