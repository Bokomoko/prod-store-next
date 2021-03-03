import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id, ...record } = req.body;

  const insertedProduct = await db
    .collection("produtos")
    .insertOne({ ...record })
  if (!insertedProduct) {
    res.json({ error: "Insert Failed" })
    return

  }
  res.json(insertedProduct);
};