import api from "../../services/AxiosURL"

export const getSpareParts = async () => {
  const response = await api.get("spareparts/");
  return response.data;
};

export const createSparePart = async (sparePart) => {
  const response = await api.post("spareparts/", sparePart);
  return response.data;
};

export const updateSparePart = async ({ id, data }) => {
  const response = await api.put(`spareparts/${id}/`, data);
  return response.data;
};

export const deleteSparePart = async (id) => {
  await api.delete(`spareparts/${id}/`);
};