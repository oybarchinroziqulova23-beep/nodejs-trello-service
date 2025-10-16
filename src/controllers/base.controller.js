import pool from "../config/db.js";

export default class createBaseController {
  constructor(tableName) {
    this.tableName = tableName;
  }

  // 🔹 CREATE
  async create(req, res) {
    try {
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);

      const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");
      const query = `
        INSERT INTO ${this.tableName} (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *;
      `;

      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // 🔹 GET ALL
  async getAll(req, res) {
    try {
      const { limit, offset } = req.pagination || { limit: 10, offset: 0 };
      const query = `
        SELECT * FROM ${this.tableName}
        ORDER BY id
        LIMIT $1 OFFSET $2;
      `;
      const result = await pool.query(query, [limit, offset]);
      res.json({
        pageInfo: { limit, offset },
        data: result.rows,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // 🔹 GET BY ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      if (result.rows.length === 0)
        return res.status(404).json({ message: "Topilmadi" });

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // 🔹 UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);

      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
      const query = `
        UPDATE ${this.tableName}
        SET ${setClause}
        WHERE id = $${fields.length + 1}
        RETURNING *;
      `;

      const result = await pool.query(query, [...values, id]);
      if (result.rows.length === 0)
        return res.status(404).json({ message: "Yangilash uchun ma'lumot topilmadi" });

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // 🔹 DELETE
  async remove(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`,
        [id]
      );
      if (result.rows.length === 0)
        return res.status(404).json({ message: "O'chirish uchun ma'lumot topilmadi" });

      res.json({ message: "O'chirildi" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // 🔹 SEARCH (yangi qo‘shilgan)
  async search(req, res) {
    try {
      const { q } = req.query;
      if (!q) return res.status(400).json({ message: "Qidiruv so‘zi kiritilmadi!" });

      // qidiruv barcha text ustunlarda LIKE orqali amalga oshiriladi
      const query = `
        SELECT * FROM ${this.tableName}
        WHERE CAST(id AS TEXT) LIKE $1
        OR CAST(${this.tableName}.title AS TEXT) LIKE $1
        OR CAST(${this.tableName}.description AS TEXT) LIKE $1
        OR CAST(${this.tableName}.username AS TEXT) LIKE $1
        OR CAST(${this.tableName}.email AS TEXT) LIKE $1;
      `;

      const result = await pool.query(query, [`%${q}%`]);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
