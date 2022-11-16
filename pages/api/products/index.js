import { products } from "../_data/products";

export default function handler(req, res) {
  console.log("req.method", req.method);
  console.log("req.query", req.query);
  console.log("req.body", req.body);

  switch (req.method) {
    case "GET":
      if (req.query.category) {
        return res
          .status(200)
          .json(
            products.filter(
              (product) => product.category === req.query.category
            )
          )
          .map((p) => {
            const { detail, ...rest } = p;
            return rest;
          });
      } else {
        return res.status(200).json(
          products.map((p) => {
            const { detail, ...rest } = p;
            return rest;
          })
        );
      }
    default:
      return res.status(400).json({ error: "method not supported" });
  }
}