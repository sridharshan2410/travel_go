const API_URL = "http://127.0.0.1:3001";

export const getPackages = async () => {
  const response = await fetch(`${API_URL}/packages`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};

export const getPackageById = async (id) => {
  const response = await fetch(`${API_URL}/packages/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};