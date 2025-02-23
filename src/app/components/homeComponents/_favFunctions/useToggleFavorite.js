// useToggleFavorite.js
import { useMutation } from '@tanstack/react-query';
import { toggleFavoriteApi } from './favoriteUtils'; 
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';

const snackbarStyles = {
  success: {
    backgroundColor: "#02A09B",
    color: "#FFFFFF",
  },
};

export const useToggleFavorite = (setFavorites) => {
    const { enqueueSnackbar } = useSnackbar();
    
    // Mutation for toggling favorites
    const { mutate: toggleFavorite } = useMutation({
      mutationFn: toggleFavoriteApi,
      onSuccess: (data, productId) => {
        const storedFavorites = Cookies.get("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};
  
        // Toggle the favorite status
        const updatedFavorites = {
          ...favorites,
          [productId]: !favorites[productId],
        };
  
        // Save to cookies
        Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 7 });
  
        // Update local state immediately in the parent component
        setFavorites(updatedFavorites);
  
        // Show success snackbar
        enqueueSnackbar(
          data.message || (favorites[productId] ? "تمت إزالة المنتج من المفضلة" : "تمت إضافة المنتج إلى المفضلة"),
          {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
            style: snackbarStyles.success,
          }
        );
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || "من فضلك قم بتسجيل الدخول";
        enqueueSnackbar(errorMessage, { variant: "error" });
      },
    });
  
    return { toggleFavorite };
  };
  