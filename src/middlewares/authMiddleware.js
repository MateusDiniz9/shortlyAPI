import { connection } from "../db/database.js";

async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = await connection.query(
      `SELECT * FROM sessions WHERE token = $1;`,
      [token]
    );
    if (user.rowCount === 0) {
      return res.sendStatus(401);
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { authMiddleware };
