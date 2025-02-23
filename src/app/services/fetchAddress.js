// services/addressUtils.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchAddresses = async (token) => {
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${apiUrl}user/get-details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: Please log in again");
  }

  const data = await response.json();
  if (!data.success) throw new Error("Failed to fetch addresses");

  return data.data.addresses || [];
};

export const deleteAddress = async (addressId, token) => {
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${apiUrl}addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete address");
  }

  return addressId;
};


export const addAddress = async (addressData ,token) => {



  const response = await fetch(`${apiUrl}addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details:", errorData);
    throw new Error(errorData.message || "Failed to add address");
  }

  return response.json();
};