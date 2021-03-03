import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb"

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.body
  if (typeof (id) != "string" ||
    (id.length != 12 && id.length != 24)
  ) {
    res.json({ error: "Invalid ID" })
    return
  }
  const wid = new ObjectId(id)

  const aProduct = await db
    .collection("produtos")
    .findOne({ _id: wid })
  if (!aProduct) {
    res.json({ error: "Not Found" });
    return
  }
  const onceAproduct = await db
    .collection("produtos")
    .deleteOne({ _id: wid })
  if (!onceAproduct) {
    res.json({ error: "Delete Failed" })
    return
  }

  res.json(aProduct);
};