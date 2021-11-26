import { products } from "../../../data/db";

export default function handler(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;

  const result = products.slice(startIndex, endIndex);

  res.status(200).json(result);
}
