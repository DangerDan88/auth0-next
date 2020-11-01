import { table, getMinifiedRecord } from "./utils/airtable";

export default async (res, req) => {
  const { id } = req.body;

  try {
    const updatedRecords = await table.destroy([id]);

    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecords[0]));
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "something went bad" });
  }
};
