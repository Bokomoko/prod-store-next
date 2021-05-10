import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log({ req })
  const { findWhat } = req.body
  let findString = {}
  if (findWhat) {
    findString = { $text: { $search: `"${findWhat}"` } }
  }
  console.log({ findString })

  const prodList = await db
    .collection("produtos")
    .find(findString)
    .limit(100)
    .toArray();

  res.json(prodList);
};