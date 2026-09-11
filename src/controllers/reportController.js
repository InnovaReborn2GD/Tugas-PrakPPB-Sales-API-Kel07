import { CustomerModel } from "../models/customerModel.js";

export const ReportController = {
  async getTotalCustomers(req, res) {
    try {
      const total = await CustomerModel.getTotal();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};