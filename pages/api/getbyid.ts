import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb'
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id, record } = req.body

  const aProduct = await db
    .collection("produtos")
    .findOne({ _id: new ObjectId(id) })
  if (!aProduct) {
    res.json({ error: "Not Found" });
    return
  }
  res.json(aProduct);
};

/*
{ _id : "603d07bd236a6f745d24399b"
description : "Turbina pancake para avião"
image : "https://ipfs.io/ipfs/QmfMR8YxLE9qRshUG244btdGNr6ZfPB5i2Y9bCwPNcLBUg?fi..."
moreattribures : {}
}*/