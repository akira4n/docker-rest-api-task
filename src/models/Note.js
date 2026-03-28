const db = require("../config/db");

// GET ALL NOTES
const getAll = async () => {
  const result = await db.query("SELECT * FROM notes ORDER BY created_at DESC");
  return result.rows;
};

// POST
const create = async (title, content) => {
  const query = `
    INSERT INTO notes (title, content)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await db.query(query, [title, content]);
  return result.rows[0];
};

// PATCH
const update = async (id, title, content) => {
  const query = `
    UPDATE notes 
    SET title = COALESCE($1, title), content = COALESCE($2, content)
    WHERE id = $3
    RETURNING *;
  `;
  const result = await db.query(query, [title, content, id]);
  return result.rows[0];
};

// DELETE
const remove = async (id) => {
  const query = "DELETE FROM notes WHERE id = $1 RETURNING *;";
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = { getAll, create, update, remove };
