import db from "../config/db.js";

export const createPlacement = async (req, res) => {
  try {
    const {
      student_id,
      company_name,
      role_title,
      package_lpa
    } = req.body;

    const result = await db.query(
      `INSERT INTO placements
      (
        student_id,
        company_name,
        role_title,
        package_lpa
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [
        student_id,
        company_name,
        role_title,
        package_lpa
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create placement record"
    });
  }
};