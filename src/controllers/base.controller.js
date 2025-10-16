import pool from "../config/db.js";
import bcrypt from "bcrypt";

export default class createBaseController {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async create(req, res) {
    try {

      const { title } = req.body;
      const existing = await pool.query(
      `SELECT * FROM boards WHERE LOWER(title) = LOWER($1)`,[title]
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({ message: "Bunday nomli board allaqachon mavjud!" });
      }

      const fields = Object.keys(req.body);
      const values = Object.values(req.body);

      const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");
      const query = `
        INSERT INTO ${this.tableName} (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *;
      `;


      const result = await pool.query(query, values);
      const user = result.rows[0];
      if(this.tableName == "users"){
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        delete user.password;
      }
      res.status(201).json(user);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

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

      const user = result.rows[0];
      delete user.password; 
      res.status(201).json(user);

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

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

  async search(req, res) {
    try{
    const queryKeys = Object.keys(req.query);
    const queryValues = Object.values(req.query);

    if (queryKeys.length === 0) {
      return res.status(400).json({ message: "Hech qanday qidiruv parametri yuborilmadi" });
    }

    const conditions = queryKeys.map((key, i) => `${key} ILIKE $${i + 1}`);
    const sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(" AND ")}`;
    const values = queryValues.map(v => `%${v}%`);

    const result = await pool.query(sql, values);

    res.json(result.rows);
    
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
