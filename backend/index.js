const express = require('express');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const defaultData = { users: [] };
const db = new Low(adapter, defaultData);

async function initDB() {
  await db.read();
  db.data ||= defaultData;
  await db.write();
}

initDB();

// Create user
// Login or auto-register
app.post('/login', async (req, res) => {
  const { name, universityId } = req.body;
  if (!universityId) return res.status(400).json({ error: 'universityId is required' });

  await db.read();
  let user = db.data.users.find(u => u.id === universityId);

  if (user) {
    // User exists → return it
    return res.json(user);
  }

  // User not found → create new
  user = {
    id: universityId,
    name: name || 'Anonymous',
    progress: { booksRead: 0, lastRead: null, details: {} }
  };

  db.data.users.push(user);
  await db.write();

  res.status(201).json(user);
});


// Get all users
app.get('/users', async (req, res) => {
  await db.read();
  res.json(db.data.users);
});

// Get single user
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  await db.read();
  const user = db.data.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
});

// Update user progress
app.put('/users/:id/progress', async (req, res) => {
  const id = req.params.id;
  const { progress } = req.body;
  if (!progress) return res.status(400).json({ error: 'progress is required' });
  await db.read();
  const user = db.data.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'not found' });
  user.progress = { ...user.progress, ...progress };
  await db.write();
  res.json(user);
});

// Update user (name)
app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'not found' });
  if (name) user.name = name;
  await db.write();
  res.json(user);
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  await db.read();
  const idx = db.data.users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  db.data.users.splice(idx, 1);
  await db.write();
  res.status(204).end();
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
