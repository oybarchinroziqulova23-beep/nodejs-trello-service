import pool from "../config/db.js";

export const createBaseController = (tableName) => {
  return {
    create: async (req, res) => {
      try {
        const fields = Object.keys(req.body);
        const values = Object.values(req.body);

        const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");
        const query = `INSERT INTO ${tableName} (${fields.join(", ")})
                       VALUES (${placeholders}) RETURNING *`;

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    getAll: async (req, res) => {
       try {
        const { limit, offset } = req.pagination || { limit: 10, offset: 0 };
        const query = `SELECT * FROM ${tableName} ORDER BY id LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);

        res.json({
        pageInfo: { limit, offset },
        data: result.rows,
      });
      } catch (err) {
      res.status(500).json({ message: err.message });
   }
  },


    getById: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);

        if (result.rows.length === 0)
          return res.status(404).json({ message: "Topilmadi" });

        res.json(result.rows[0]);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const { id } = req.params;
        const fields = Object.keys(req.body);
        const values = Object.values(req.body);

        const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

        const result = await pool.query(query, [...values, id]);
        if (result.rows.length === 0)
          return res.status(404).json({ message: "Yangilash uchun ma'lumot topilmadi" });

        res.json(result.rows[0]);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0)
          return res.status(404).json({ message: "O'chirish uchun ma'lumot topilmadi" });

        res.json({ message: "O'chirildi" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
  };
};
