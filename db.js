// db.js
const sqlite3 = require('sqlite3').verbose();
class Database {
  constructor(file = './portfolio.db') {
    this.db = new sqlite3.Database(file, (err) => {
      if (err) {console.error('❌ Error connecting to database:', err.message);} else {console.log('✅ Connected to SQLite:', file);}
    });
  }
  // جلب سجل حسب ID
  get(id, column = '*', table) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ${column} FROM ${table} WHERE id = ? LIMIT 1`;
      this.db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  // جلب كل السجلات من جدول
  getAll(table) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${table}`;
      this.db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  // إدخال بيانات
  insert(table, data) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
      this.db.run(sql, values, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }
  // تحديث سجل
  update(table, id, data) {
    return new Promise((resolve, reject) => {
      const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];
      const sql = `UPDATE ${table} SET ${updates} WHERE id = ?`;
      this.db.run(sql, values, function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
  // حذف سجل
  delete(table, id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${table} WHERE id = ?`;
      this.db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
  // إغلاق الاتصال
  close() {
    this.db.close();
  }
}
module.exports = Database;
