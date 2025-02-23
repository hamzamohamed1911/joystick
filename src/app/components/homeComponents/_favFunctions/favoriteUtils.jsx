import Cookies from "js-cookie";

// API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Function to toggle favorite using the API
export const toggleFavoriteApi = async (productId) => {
  const token = Cookies.get("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${apiUrl}favorite/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      lang: "ar",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update favorite status: ${errorText}`);
  }

  return response.json();
};

// Utility function to show notifications for favorite status updates
export const handleFavoriteNotification = (enqueueSnackbar, isAdded) => {
  enqueueSnackbar(
    favorites[productId] ? "تمت إزالة المنتج من المفضلة" : "تمت إضافة المنتج إلى المفضلة",
    { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" }, style: snackbarStyles.success }
  );
};
