import { connection } from "../db/database.js";

const showRanking = async (req, res) => {
  try {
    const asdas =
      await connection.query(`SELECT * FROM users JOIN urls ON users.id = urls."userId"

    SELECT users.id, users.name, COUNT(visits."userId") AS "visitCount" FROM users
    JOIN visits ON users.id = visits."userId" GROUP BY users.id`);

    const response = { status: "ok" };
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { showRanking };
