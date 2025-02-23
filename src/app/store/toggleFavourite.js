
// export const toggleFavorite = async (productId, favorites, setFavorites, enqueueSnackbar) => {
//     const isCurrentlyFavorited = favorites[productId];
  
//     try {
//       const response = await toggleFavoriteApi(productId, !isCurrentlyFavorited);
  
//       if (response.success) {
//         setFavorites((prev) => ({
//           ...prev,
//           [productId]: !isCurrentlyFavorited,
//         }));
  
//         handleFavoriteNotification(enqueueSnackbar, !isCurrentlyFavorited);
//       }
//     } catch (error) {
//       enqueueSnackbar("حدث خطأ أثناء تحديث المفضلة", {
//         variant: "error",
//         anchorOrigin: { vertical: "top", horizontal: "right" },
//         style: { backgroundColor: "#FF4D4D", color: "#FFFFFF" },
//       });
//     }
//   };
  