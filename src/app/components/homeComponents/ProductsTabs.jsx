"use client";
import { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import FilteredProducts from "./FilteredProducts";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../Loading";
import { fetchCategories } from "../../services/fetchCategories"; 
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProductsTabs() {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setCatLoading(true);
        const data = await fetchCategories(); 
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCatLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const selectedCategory = categories[value];
          const categoryId = selectedCategory?.id || "";
          const response = await fetch(`${apiUrl}products/filter`, {
            method: "POST",
            headers: {  "Content-Type": "application/json",
              "lang": "ar",
             },
            body: JSON.stringify({ category_id: categoryId }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
          setProducts(data.data || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [value, categories]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (catLoading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="product tabs"
          textColor="inherit"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "13px",
              fontWeight: "semibold",
              color: "white",
              backgroundColor: "#026D69",
              borderRadius: "10px",
              marginRight: "8px",
              minHeight: "0px",
              padding: "10px",
            },
            "& .Mui-selected": {
              backgroundColor: "#026D69",
              color: "white",
            },
          }}
        >
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Tab
                key={category.id || index}
                label={category.name}
                {...a11yProps(index)}
              />
            ))
          ) : (
            <div>No categories available</div>
          )}
        </Tabs>
      </Box>

      <TabPanel value={value} index={value}>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 countainer max-w-screen-xl mx-auto">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between animate-pulse lg:max-w-64 md:max-w-64 max-w-60"
              >
                <div className="relative bg-[#F2FAFA] h-48 rounded-lg flex justify-center items-center">
                  <div className="absolute top-1 left-1 cursor-pointer">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <FilteredProducts products={products} />
        )}
      </TabPanel>
    </Box>
  );
}