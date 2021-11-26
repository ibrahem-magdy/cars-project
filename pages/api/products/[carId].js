import { products } from "../../../data/db";

export default function handler(req, res) {
  const { carId } = req.query;
  const car = products.find((car) => car.id === carId);
  res.status(200).json(car);
}
