import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { findWhat } = req
  let findString = ""
  if (findWhat) {
    findString = `{ $text: { $search: "${findWhat}" } }`
  }


  const prodList = await db
    .collection("produtos")
    .find({ findString })
    .limit(20)
    .toArray();

  res.json(prodList);
};