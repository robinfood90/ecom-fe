const API_BASE_URL = "https://ecom-be-production.up.railway.app";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle 204 No Content (for DELETE requests)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Product API functions
export const productAPI = {
  getAll: () => apiRequest("/products"),
  
  getById: (id) => apiRequest(`/products/${id}`),
  
  create: (productData) =>
    apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    }),
  
  update: (id, productData) =>
    apiRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    }),
  
  delete: (id) =>
    apiRequest(`/products/${id}`, {
      method: "DELETE",
    }),
};

// Request API functions
export const requestAPI = {
  getAll: () => apiRequest("/requests"),
  
  getById: (id) => apiRequest(`/requests/${id}`),
};

