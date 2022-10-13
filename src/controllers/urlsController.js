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

const urlById = async (req, res) => {
  const { id } = req.params;
  try {
    const url = await connection.query(`SELECT * FROM urls WHERE id = $1;`, [
      id,
    ]);
    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }
    const response = {
      id: url.rows[0].id,
      shortUrl: url.rows[0].shortUrl,
      url: url.rows[0].url,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export { shortenUrl, urlById };
