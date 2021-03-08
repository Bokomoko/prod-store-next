import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const record = { ...req.body };
  const id = new ObjectId()
  const insertedProduct = await db
    .collection("produtos")
    .insertOne({ id, ...record })
  if (!insertedProduct) {
    res.json({ error: "Insert Failed" })
    return

  }
  res.json(insertedProduct);
};