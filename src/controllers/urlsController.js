import { connection } from "../db/database.js";
import { urlsSchema } from "../schemas/urlsSchema.js";
import { nanoid } from "nanoid";

const shortenUrl = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const { url } = req.body;

  const validation = urlsSchema.validate({ url }, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const valid = httpRegex.test(url);
  if (!valid) {
    return res.status(422).send("url invalida");
  }

  try {
    const userId = await connection.query(
      `SELECT "userId" FROM sessions WHERE token = $1;`,
      [token]
    );
    let shorten = url;
    shorten = nanoid();
    const response = { shortUrl: shorten };

    await connection.query(
      `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3);`,
      [url, shorten, userId.rows[0].userId]
    );

    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { shortenUrl };
