import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;

export class Database {
  private db: sqlite3.Database;

  constructor(file: string = './portfolio.db') {
    this.db = new (verbose().Database)(file, (err) => {
      if (err) {
        console.error('❌ Error connecting to database:', err.message);
      } else {
        console.log('✅ Connected to SQLite:', file);
      }
    });
  }

  // ✅ Get a single row by ID
  get<T = any>(id: number, column: string = '*', table: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ${column} FROM ${table} WHERE id = ? LIMIT 1`;
      this.db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row as T);
      });
    });
  }

  // ✅ Get all rows from a table
  getAll<T = any>(table: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${table}`;
      this.db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  // ✅ Insert a new record
  insert(table: string, data: Record<string, any>): Promise<{ id: number }> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
      this.db.run(sql, values, function (this: sqlite3.RunResult, err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }

  // ✅ Update a record by ID
  update(table: string, id: number, data: Record<string, any>): Promise<{ changes: number }> {
    return new Promise((resolve, reject) => {
      const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];
      const sql = `UPDATE ${table} SET ${updates} WHERE id = ?`;
      this.db.run(sql, values, function (this: sqlite3.RunResult, err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  // ✅ Delete a record by ID
  delete(table: string, id: number): Promise<{ changes: number }> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${table} WHERE id = ?`;
      this.db.run(sql, [id], function (this: sqlite3.RunResult, err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  // ✅ Close database connection
  close(): void {
    this.db.close((err) => {
      if (err) console.error('❌ Error closing database:', err.message);
      else console.log('🛑 Database connection closed.');
    });
  }
}
