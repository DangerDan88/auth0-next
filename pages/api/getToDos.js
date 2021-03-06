import { table, minifyRecords } from "./utils/airtable";

export default async (res, req) => {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "something went bad" });
  }
};
