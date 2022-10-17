import { connection } from "../db/database.js";
import { urlsSchema } from "../schemas/urlsSchema.js";
import { nanoid } from "nanoid";

const shortenUrl = async (req, res) => {
  const { url } = req.body;
  const { user } = res.locals;

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
    let shorten = url;
    shorten = nanoid();
    const response = { shortUrl: shorten };

    await connection.query(
      `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3);`,
      [url, shorten, user.rows[0].userId]
    );

    const selfUrl = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shorten]
    );

    await connection.query(
      `INSERT INTO visits ("urlId", "userId") VALUES ($1,$2);`,
      [selfUrl.rows[0].id, selfUrl.rows[0].userId]
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

const openShortUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const short = shortUrl?.replace(":", "");
  try {
    const shortUrlExist = await connection.query(
      `SELECT * FROM urls Where "shortUrl" = $1;`,
      [short]
    );

    if (shortUrlExist.rowCount === 0) {
      return res.sendStatus(404);
    }

    await connection.query(
      `INSERT INTO visits ("urlId", "userId") VALUES ($1,$2);`,
      [shortUrlExist.rows[0].id, shortUrlExist.rows[0].userId]
    );

    return res.redirect(`${shortUrlExist.rows[0].url}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUrlById = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;
  try {
    const url = await connection.query(`SELECT * FROM urls WHERE id = $1;`, [
      id,
    ]);
    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (user.rows[0].userId !== url.rows[0].userId) {
      return res.sendStatus(401);
    }
    await connection.query(`DELETE FROM visits WHERE "urlId" = $1;`, [
      url.rows[0].id,
    ]);
    await connection.query(`DELETE FROM urls WHERE url = $1;`, [
      url.rows[0].url,
    ]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export { shortenUrl, urlById, openShortUrl, deleteUrlById };
