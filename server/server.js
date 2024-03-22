
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Userstory = require('./models/userstoriesSchema');
const Iteration = require('./models/iterationsSchema');
const Release = require('./models/releasesSchema');
const Team = require('./models/teamsSchema');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vesdb2')

// @api {get} /userStories Get all user stories
app.get('/userStories', async (req, res) => {
  try {
    const userstories = await Userstory.find().populate('assignees'); // Populate assignees
    res.json(userstories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//@api {get} /iterations Get all iterations
app.get('/iterations', async (req, res) => {
  try {
    const iterations = await Iteration.find().populate('assignees'); // Populate assignees
    res.json(iterations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @api {get} /releases Get all releases
app.get('/releases', async (req, res) => {
  try {
    const releases = await Release.find().populate('iterations');
    res.json(releases);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @api {get} /teams Get all teams
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// @api {post} /userStories Create a new user story
app.post('/userStories', async (req, res) => {
  const {
    name,
    description,
    status,
    priority,
    storyPoints,
    blocked,
    assignees,
  } = req.body;

  try {
    const newUserStory = new Userstory({
      name,
      description,
      status,
      priority,
      storyPoints,
      blocked,
      assignees,
    });

    await newUserStory.save();

    // Send a response with the created user story
    res.status(201).json(newUserStory);
  } catch (error) {
    console.error('Error creating user story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//@api {post} /iterations Create a new iteration
app.post('/iterations', async (req, res) => {
  const {
    name,
    objective,
    userStories,
    startDate,
    endDate,
    assignees,
    status,
    priority,
  } = req.body;

  try {
    const newIteration = new Iteration({
      name,
      objective,
      userStories,
      startDate,
      endDate,
      assignees,
      status,
      priority,
    });

    await newIteration.save();

    // Send a response with the created iteration
    res.status(201).json(newIteration);
  } catch (error) {
    console.error('Error creating iteration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {post} /releases Create a new release
app.post('/releases', async (req, res) => {
  const {
    name,
    objective,
    iterations,
    startDate,
    endDate,
    released,
  } = req.body;

  try {
    const newRelease = new Release({
      name,
      objective,
      iterations,
      startDate,
      endDate,
      released,
    });

    await newRelease.save();

    // Send a response with the created release
    res.status(201).json(newRelease);
  } catch (error) {
    console.error('Error creating release:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {post} /teams Create a new team
app.post('/teams', async (req, res) => {
  const { name, objective } = req.body;

  try {
    const newTeam = new Team({ name, objective });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /userStories/:id Get details of a specific user story
app.get('/userStories/:id', async (req, res) => {
  try {
    const userStory = await Userstory.findById(req.params.id).populate('assignees');
    if (!userStory) {
      res.status(404).json({ error: 'User Story not found' });
      return;
    }
    res.json(userStory);
  } catch (error) {
    console.error('Error fetching user story details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /iterations/:id Get details of a specific iteration
app.get('/iterations/:id', async (req, res) => {
  try {
    const iteration = await Iteration.findById(req.params.id).populate('assignees').populate('userStories');
    if (!iteration) {
      res.status(404).json({ error: 'Iteration not found' });
      return;
    }
    res.json(iteration);
  } catch (error) {
    console.error('Error fetching iteration details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /releases/:id Get details of a specific release
app.get('/releases/:id', async (req, res) => {
  try {
    const release = await Release.findById(req.params.id).populate('iterations');
    if (!release) {
      res.status(404).json({ error: 'Release not found' });
      return;
    }
    res.json(release);
  } catch (error) {
    console.error('Error fetching release details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//@api {get} /teams/:id Get details of a specific team
app.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      res.status(404).json({ error: 'Release not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    console.error('Error fetching release details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete user story
app.delete('/userStories/:id', async (req, res) => {
  try {
    const deletedUserStory = await Userstory.findByIdAndDelete(req.params.id);
    if (!deletedUserStory) {
      res.status(404).json({ error: 'User Story not found' });
      return;
    }
    res.json({ message: 'User Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting user story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete iteration
app.delete('/iterations/:id', async (req, res) => {
  try {
    const deletedIteartion = await Iteration.findByIdAndDelete(req.params.id);
    if (!deletedIteartion) {
      res.status(404).json({ error: 'Iteration not found' });
      return;
    }
    res.json({ message: 'Iteration deleted successfully' });
  } catch (error) {
    console.error('Error deleting iteration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete release
app.delete('/releases/:id', async (req, res) => {
  try {
    const deletedRelease = await Release.findByIdAndDelete(req.params.id);
    if (!deletedRelease) {
      res.status(404).json({ error: 'Release not found' });
      return;
    }
    res.json({ message: 'Release deleted successfully' });
  } catch (error) {
    console.error('Error deleting release:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//`