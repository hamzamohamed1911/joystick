// utils/fetchCategories.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchCategories = async () => {
  try {
    const response = await fetch(`${apiUrl}categories`, {
      headers: {
        "Content-Type": "application/json",
        "lang": "ar",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.data?.data || [];
  } catch (error) {
    throw new Error(error.message);
  }
};