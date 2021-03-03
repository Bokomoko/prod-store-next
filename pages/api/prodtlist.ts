import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const prodList = await db
    .collection("produtos")
    .find({})
    .limit(20)
    .toArray();

  res.json(prodList);
};