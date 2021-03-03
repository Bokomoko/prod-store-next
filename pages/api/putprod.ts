import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id, ...record } = req.body;
  const wid = new ObjectId(id)
  // check if the product is in
  const aProduct = await db
    .collection("produtos")
    .findOne({ _id: wid })
  if (!aProduct) {
    res.json({ error: "Not Found" });
    return
  }
  // changes only the attributes submitted 
  const changedProduct = { ...aProduct, ...record }

  // remove the old record
  const onceAproduct = await db
    .collection("produtos")
    .deleteOne({ _id: wid })
  if (!onceAproduct) {
    res.json({ error: "Update Step 1 Failed" })
    return
  }

  // insert the new, updated record
  const updatedProduct = await db
    .collection("produtos")
    .insertOne({ ...changedProduct, _id: wid })
  if (!updatedProduct) {
    res.json({ error: "Update Step 2 Failed" })
    return
  }
  // returns the updated object
  res.json(updatedProduct);
};