import db from "../config/db.js";

export const createJob = async (req, res) => {
  try {
    const {
      company_name,
      role_title,
      min_cgpa,
      max_backlogs,
      allowed_branches,
      ctc,
      job_description,
      deadline,
      apply_link
    } = req.body;

    const result = await db.query(
      `INSERT INTO jobs (
        company_name,
        role_title,
        min_cgpa,
        max_backlogs,
        allowed_branches,
        ctc,
        job_description,
        deadline,
        apply_link,
        created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        company_name,
        role_title,
        min_cgpa,
        max_backlogs,
        allowed_branches,
        ctc,
        job_description,
        deadline,
        apply_link,
        req.user.id
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create job"
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM jobs
       ORDER BY created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch jobs"
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM jobs WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch job"
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      role_title,
      min_cgpa,
      max_backlogs,
      allowed_branches,
      ctc,
      job_description,
      deadline,
      apply_link
    } = req.body;

    const result = await db.query(
      `UPDATE jobs
       SET
        company_name=$1,
        role_title=$2,
        min_cgpa=$3,
        max_backlogs=$4,
        allowed_branches=$5,
        ctc=$6,
        job_description=$7,
        deadline=$8,
        apply_link=$9
       WHERE id=$10
       RETURNING *`,
      [
        company_name,
        role_title,
        min_cgpa,
        max_backlogs,
        allowed_branches,
        ctc,
        job_description,
        deadline,
        apply_link,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update job"
    });
  }
};

export const getEligibleJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get student profile
    const studentResult = await db.query(
      `SELECT cgpa, backlogs, branch
       FROM student_profiles
       WHERE user_id = $1`,
      [userId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    const student = studentResult.rows[0];

    // Fetch only eligible jobs
    const jobsResult = await db.query(
      `SELECT *
       FROM jobs
       WHERE
         min_cgpa <= $1
         AND max_backlogs >= $2
         AND $3 = ANY(allowed_branches)
         AND deadline >= CURRENT_DATE
       ORDER BY deadline ASC`,
      [
        student.cgpa,
        student.backlogs,
        student.branch
      ]
    );

   jobsResult.rows.forEach(job => {
        job.allowed_branches = job.allowed_branches
            ? job.allowed_branches.replace(/[{}]/g, '').split(',')
            : [];
    });
    res.status(200).json(jobsResult.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch eligible jobs"
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `DELETE FROM jobs
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      job: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete job"
    });
  }
};