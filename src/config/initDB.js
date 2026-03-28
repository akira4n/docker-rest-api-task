const db = require("./db");

const initializeDatabase = async () => {
  try {
    console.log("Starting database migration...");

    const createNotesTableQuery = `
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    await db.query(createNotesTableQuery);

    console.log(
      "Database migration completed successfully! All tables are ready.",
    );
  } catch (error) {
    console.error("Error during database migration:", error);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
