import { connection } from "../db/database.js";
import bcrypt from "bcrypt";
import { signUpSchema, signInSchema } from "../schemas/userSchema.js";
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const validation = signUpSchema.validate(
    { name, email, password, confirmPassword },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  if (password !== confirmPassword) {
    return res
      .status(422)
      .send("password and confirmPassword must be the same");
  }
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const userExists = await connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    console.log(userExists);
    if (userExists.rowCount !== 0) {
      return res.sendStatus(409);
    }
    await connection.query(
      `INSERT INTO users (name, email, "encryptedPassword") VALUES ($1, $2, $3);`,
      [name, email, passwordHash]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const validation = signInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const user = await connection.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );
    if (user.rowCount === 0) {
      return res.sendStatus(401);
    }

    const passwordValid = bcrypt.compareSync(
      password,
      user.rows[0].encryptedPassword
    );
    if (!passwordValid) {
      return res.sendStatus(401);
    }

    const response = { token: uuid() };

    await connection.query(
      `INSERT INTO sessions ("userId",token) VALUES ($1,$2);`,
      [user.rows[0].id, response.token]
    );

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const usersInfos = async (req, res) => {
  const { user } = res.locals;
  try {
    const userId = user.rows[0].userId;

    const hasUrls = await connection.query(
      `SELECT * FROM urls WHERE "userId" = $1;`,
      [userId]
    );
    if (hasUrls.rowCount === 0) {
      const zeroUser = await connection.query(
        `SELECT * FROM users WHERE users.id = $1`,
        [userId]
      );

      const response = {
        id: userId,
        name: zeroUser.rows[0].name,
        visitCount: 0,
        shortenedUrls: {},
      };
      return res.status(200).send(response);
    }

    const userData = await connection.query(
      `SELECT name, COUNT("userId") AS "visitCount" FROM users 
      JOIN visits ON visits."userId" = users.id WHERE users.id = $1 GROUP BY users.id;`,
      [userId]
    );
    const urlsData = await connection.query(
      `SELECT urls.id, urls.url, urls."shortUrl", COUNT(*) AS "visitCount" FROM urls
    JOIN visits ON visits."urlId" = urls.id WHERE urls."userId" = $1 GROUP BY urls.id;`,
      [userId]
    );
    urlsData.rows.map((url) => url.visitCount--);
    const response = {
      id: userId,
      name: userData.rows[0].name,
      visitCount: userData.rows[0].visitCount - urlsData.rows.length,
      shortenedUrls: urlsData.rows,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export { signUp, signIn, usersInfos };
