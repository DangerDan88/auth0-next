require("dotenv").config();

const Airtable = require("airtable");
const base = new Airtable({ apiKey: "keyC0L1DoS6vboLIV" }).base(
  "appCKZ2LvRcOFAqEI"
);

const table = base("todo");

const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export default async (req, res) => {
  const records = await table.select({}).firstPage();
  const minifiedRecords = minifyRecords(records);
  res.statusCode = 200;
  res.json(minifiedRecords);
};

//airtable work in pagination method of dividing web content into discrete pages Pagination is a web content organization technique that has been used for decades. Though such alternatives as infinite scrolling have emerged, it is still a prime choice in many projects due to its familiarity and convenience.

export { table, getMinifiedRecord, minifyRecords };
