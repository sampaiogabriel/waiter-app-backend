import { Request, Response } from "express";
import { Order } from "../../app/models/Order";

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res.status(400).json({
        error: "Status should be one of these: WAITING, IN_PRODUCTION, DONE",
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({
      error: "Internal Server Error",
    });
  }
}
