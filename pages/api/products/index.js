import { products } from "../../../data/db";

export default function handler(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;
  res.setHeader("Cache-control", "S-maxage=10,stale-while-revalidate");
  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;

  const result = products.slice(startIndex, endIndex);

  res.status(200).json(result);
}
