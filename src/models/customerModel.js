import { supabase } from "../config/supabaseClient.js";

export const CustomerModel = {
  async getAll({ name, page, limit }) {
    const offset = (page - 1) * limit;
    let query = supabase
      .from("customers")
      .select("*", { count: "exact" })
      .range(offset, offset + limit - 1);

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;
    return { data, count };
  },

  async getTotal() {
    const { count, error } = await supabase
      .from("customers")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return count;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(customer) {
    const { data, error } = await supabase
      .from("customers")
      .insert([customer])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, customer) {
    const { data, error } = await supabase
      .from("customers")
      .update(customer)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw error;
    return { message: "Customer deleted successfully" };
  },
};


