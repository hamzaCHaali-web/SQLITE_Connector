# SQLITE_Connector
Perfect. Below is a **complete `README.md`** file that includes:

✅ Intro & Installation
✅ JavaScript & TypeScript usage examples
✅ SQLite table creation
✅ API reference
✅ ✅ NEW: Comparison Table between JS & TS
✅ ✅ NEW: How to use with Express API routes

---

## ✅ Full `README.md` (copy directly to GitHub)

````md
# 📦 SQLite Database Wrapper (Node.js / TS / JS)

A lightweight SQLite3 wrapper class for Node.js projects — built for simplicity and flexibility. Works with both **JavaScript** and **TypeScript**.

> 🔧 Use it in scripts or API routes (e.g. Express, Next.js, Fastify)

---

## 📥 Installation

```bash
npm install sqlite3
````

### TypeScript projects:

```bash
npm install --save-dev @types/sqlite3
```

---

## ⚖️ JavaScript vs TypeScript Differences

| Feature               | JavaScript (`db.js`) | TypeScript (`db.ts`)              |
| --------------------- | -------------------- | --------------------------------- |
| Setup                 | `require()`          | `import` / `export`               |
| Typing                | Dynamic              | Strong static typing              |
| Interface support     | ❌ No interfaces      | ✅ Can define types for rows       |
| Autocomplete & safety | ❌ Minimal            | ✅ Full with VSCode/intellisense   |
| Build                 | No build needed      | Needs `tsc` (TypeScript compiler) |

---

## 📂 File Structure Example

```
📁 your-project/
│
├─ db.js / db.ts      # Your database class
├─ index.js / index.ts# How to use it
├─ routes/            # Optional API routes
```

---

## 🗃️ Sample Table SQL (for testing)

```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT
);
```

---

## 🚀 JavaScript Example

```js
const Database = require('./db');
const db = new Database();

async function run() {
  await db.insert('projects', { title: 'My Site', description: 'My portfolio' });

  const project = await db.get(1, '*', 'projects');
  console.log(project);

  const all = await db.getAll('projects');
  console.log(all);

  await db.update('projects', 1, { title: 'Updated Title' });

  await db.delete('projects', 1);

  db.close();
}
run();
```

---

## 🚀 TypeScript Example

```ts
import { Database } from './db';
const db = new Database();

interface Project {
  id: number;
  title: string;
  description: string;
}

async function run() {
  await db.insert('projects', { title: 'TS App', description: 'Typed data' });

  const project = await db.get<Project>(1, '*', 'projects');
  console.log(project);

  const all = await db.getAll<Project>('projects');
  console.log(all);

  await db.update('projects', 1, { title: 'Updated with TS' });

  await db.delete('projects', 1);

  db.close();
}
run();
```

---

## 🌐 Using with Express.js API

Install Express:

```bash
npm install express
```

Create a basic API:

```js
// routes/projects.js or api/projects.ts
const express = require('express');
const router = express.Router();
const Database = require('../db');
const db = new Database();

router.get('/', async (req, res) => {
  const projects = await db.getAll('projects');
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const project = await db.get(id, '*', 'projects');
  res.json(project);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const result = await db.insert('projects', data);
  res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const result = await db.update('projects', id, data);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.delete('projects', id);
  res.json(result);
});

module.exports = router;
```

Then plug into `server.js`:

```js
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/projects', require('./routes/projects'));

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
```

---

## 📘 API Reference

| Method                    | Description               | Returns                |
| ------------------------- | ------------------------- | ---------------------- |
| `get(id, column, table)`  | Get single record by `id` | `Promise<object>`      |
| `getAll(table)`           | Get all rows from a table | `Promise<object[]>`    |
| `insert(table, data)`     | Insert new record         | `Promise<{ id }>`      |
| `update(table, id, data)` | Update record by ID       | `Promise<{ changes }>` |
| `delete(table, id)`       | Delete record by ID       | `Promise<{ changes }>` |
| `close()`                 | Close DB connection       | `void`                 |

---

## 🧠 Tips

* Always `await` DB methods inside `async` functions.
* For production, use a persistent path: `new Database('./data/db.sqlite')`
* Use `try/catch` for better error handling.

---

## 🔖 License

MIT — Free for personal and commercial use.

---

## 🦾 Author

Made with ❤️ by \[Your Name]

```

---

### Do you want me to:
- Generate this as a `README.md` file for download?  
- Translate it to Arabic or French as well?  
- Add example `db.ts` or `api` folders?

Let me know how you want to finalize it.
```
