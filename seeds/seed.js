const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://localhost/network-the-social', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userData = [
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123',
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
    password: 'password456',
  },
  {
    username: 'IWilboI',
    email: 'IWilboI@IWilboI.com',
    password: 'IWilboI',
  }
];

const thoughtData = [
  {
    content: 'This is my first thought!',
    username: 'johndoe',
  },
  {
    content: 'I love programming!',
    username: 'janedoe',
  },
  {
    content: 'STRUGGLE',
    username: 'IWilboI',
  }
];

const seedDatabase = async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = await User.insertMany(userData);
  console.log('Users seeded');

  const thoughtsWithUserIds = thoughtData.map(thought => ({
    ...thought,
    username: users[Math.floor(Math.random() * users.length)].username,
  }));

  await Thought.insertMany(thoughtsWithUserIds);
  console.log('Thoughts seeded');

  process.exit(0);
};

seedDatabase();
