import { products } from "../../../data/db";

export default function handler(req, res) {
  const { carId } = req.query;
  res.setHeader("Cache-control", "S-maxage=10,stale-while-revalidate");
  const car = products.find((car) => car.id === carId);
  res.status(200).json(car);
}
