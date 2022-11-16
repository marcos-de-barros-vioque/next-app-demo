import { products } from "../_data/products";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      const product = products.find(
        (p) => Number(p.id) === Number(req.query.productId)
      );
      if (product) {
        return res.status(200).json(product);
      } else {
        return res
          .status(404)
          .json({ error: `Product ${req.query.productId} not found` });
      }
    default:
      return res.status(400).json({ error: "method not supported" });
  }
}