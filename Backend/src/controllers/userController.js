import db from "../config/db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, email, role, created_at FROM users"
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const createUsers = async (req,res) => {
  try{
    console.log(req.body);
    const {email,password,role}=req.body;
    const result = await db.query(
      `
      INSERT INTO users(email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role, created_at
      `,
      [email, password, role]
    );
    res.status(201).json(result.rows[0]);

  }catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create users",
    });
  }
  
}