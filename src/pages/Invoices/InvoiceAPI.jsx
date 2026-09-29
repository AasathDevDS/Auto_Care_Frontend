import api from "../../services/AxiosURL"

export const getInvoices = async () => {
  const response = await api.get("invoices/");
  return response.data;
};

export const createInvoices = async (invoice) => {
  const response = await api.post("invoices/", invoice);
  return response.data;
};

export const updateInvoices = async ({ id, data }) => {
  const response = await api.put(`invoices/${id}/`, data);
  return response.data;
};

export const deleteInvoices = async (id) => {
  await api.delete(`invoices/${id}/`);
};