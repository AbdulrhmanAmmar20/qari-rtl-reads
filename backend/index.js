const express = require('express');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


// Serve static files (optional for avatar)
app.use(express.static(path.join(__dirname, 'public')));

// Root route to prevent 404
// Health route returns JSON (avoid HTML pages on API root)
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Backend is running' }));

// Simple request logger for debugging (prints method, path and body)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - body:`, req.body || {});
  next();
});



const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const defaultData = { users: [], books: [] };
const db = new Low(adapter, defaultData);

async function initDB() {
  await db.read();
  db.data ||= defaultData;
  await db.write();
}

initDB();

// Create user
// Login or auto-register
// Login or auto-register
app.post('/login', async (req, res) => {
  const { name, universityId } = req.body;
  console.log('POST /login payload:', { name, universityId });
  if (!universityId) return res.status(400).json({ error: 'universityId is required' });

  await db.read();
  let user = db.data.users.find(u => u.id === universityId);

  if (!user) {
    user = {
      id: universityId,
      name: name || 'Anonymous',
      progress: { booksRead: 0, lastRead: null, details: {} },
    };
    db.data.users.push(user);
    await db.write();
  }

  console.log('POST /login returning user:', user);

  res.json(user);
});

// Return JSON 404 for any unmatched API routes (prevents HTML 404 pages)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


// Get all users
app.get('/users', async (req, res) => {
  await db.read();
  res.json(db.data.users);
});

// Get all books
app.get('/books', async (req, res) => {
  await db.read();
  res.json(db.data.books || []);
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
app.listen(port, () => console.log(`Backend running on port ${port}`));
