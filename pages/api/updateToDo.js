import { table, getMinifiedRecord } from "./utils/airtable";

export default async (res, req) => {
  const { id, fields } = req.body;

  try {
    const updatedRecords = await table.update([{ id, fields }]);

    res.statusCode = 200;
    res.json(getMinifiedRecord(updatedRecords[0]));
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "something went bad" });
  }
};
