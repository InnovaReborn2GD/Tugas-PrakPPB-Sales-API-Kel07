import { CustomerModel } from "../models/customerModel.js";

export const CustomerController = {
  async getAll(req, res) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);

      if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({ error: "Page harus berupa bilangan bulat positif" });
      }
      if (!Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({ error: "Limit harus berupa bilangan bulat positif" });
      }

      const result = await CustomerModel.getAll({
        name: req.query.name,
        page,
        limit,
      });
      res.json({
        data: result.data,
        pagination: {
          page,
          limit,
          total: result.count,
          totalPages: Math.ceil(result.count / limit),
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      validateCustomer(req.body);
      const customer = await CustomerModel.create(req.body);
      res.status(201).json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      validateCustomer(req.body, { partial: true });
      const customer = await CustomerModel.update(req.params.id, req.body);
      res.json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

function validateCustomer(customer, { partial = false } = {}) {
  if (!partial || customer.email !== undefined) {
    if (typeof customer.email !== "string" || !customer.email.includes("@")) {
      throw new Error("Email wajib memiliki karakter @");
    }
  }

  if (!partial || customer.phone !== undefined) {
    if (typeof customer.phone !== "string" || customer.phone.trim().length < 10) {
      throw new Error("Nomor telepon wajib diisi minimal 10 karakter");
    }
  }
}
