import { connection } from "../db/database.js";

function bblSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].visitCount < arr[j + 1].visitCount) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      if (
        arr[j].visitCount === arr[j + 1].visitCount &&
        arr[j].linksCount < arr[j + 1].linksCount
      ) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const showRanking = async (req, res) => {
  try {
    const links =
      await connection.query(`SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount" FROM users
      LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY users.id DESC;`);

    const visits =
      await connection.query(`SELECT users.id, users.name, COUNT(visits."userId") AS "visitCount" FROM users
      LEFT JOIN visits ON users.id = visits."userId" GROUP BY users.id ORDER BY users.id DESC;`);
    const newTable = [];
    for (let i = 0; i < links.rows.length; i++) {
      newTable[i] = {
        id: links.rows[i].id,
        name: links.rows[i].name,
        linksCount: Number(links.rows[i].linksCount),
        visitCount: visits.rows[i].visitCount - links.rows[i].linksCount,
      };
    }
    let response = bblSort(newTable);
    if (response.length > 10) {
      response = response.slice(0, 10);
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { showRanking };
