import db from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalStudentsResult = await db.query(
      `SELECT COUNT(*) AS count
       FROM users
       WHERE role = 'student'`
    );

    const placedStudentsResult = await db.query(
      `SELECT COUNT(DISTINCT student_id) AS count
       FROM placements`
    );

    const packageStatsResult = await db.query(
      `SELECT
          COALESCE(MAX(package_lpa),0) AS highest_package,
          COALESCE(ROUND(AVG(package_lpa),2),0) AS average_package
       FROM placements`
    );

    const recruitersResult = await db.query(
      `SELECT
          company_name,
          COUNT(*) AS offers
       FROM placements
       GROUP BY company_name
       ORDER BY offers DESC
       LIMIT 5`
    );

    const totalStudents =
      Number(totalStudentsResult.rows[0].count);

    const placedStudents =
      Number(placedStudentsResult.rows[0].count);

    const unplacedStudents =
      totalStudents - placedStudents;

    const placementRate =
      totalStudents === 0
        ? 0
        : Number(
            (
              (placedStudents / totalStudents) *
              100
            ).toFixed(2)
          );

    res.status(200).json({
      totalStudents,
      placedStudents,
      unplacedStudents,
      placementRate,
      highestPackage:
        packageStatsResult.rows[0].highest_package,
      averagePackage:
        packageStatsResult.rows[0].average_package,
      topRecruiters:
        recruitersResult.rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics"
    });
  }
};