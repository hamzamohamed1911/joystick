"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTags = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }

    const data = await response.json();
    return Array.isArray(data?.data?.data) ? data.data.data : [];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return []; 
  }
};

const PopularTag = ({ onTagChange }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (id) => {
    const newSelectedTags = selectedTags.includes(id)
      ? selectedTags.filter((tagId) => tagId !== id)
      : [...selectedTags, id];
    setSelectedTags(newSelectedTags);
    onTagChange(newSelectedTags);
  };

  const { data: productTags = [], isLoading, error } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  
  return (
    <div className="flex flex-col">
      <h3 className="font-medium text-xl mb-4">Popular Tags</h3>

      {isLoading ? (
        <p className="text-gray-500 mt-4">جارٍ تحميل البيانات...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">حدث خطأ في تحميل البيانات.</p>
      ) : (
        <ul className="flex flex-wrap gap-4 items-center mt-4">
          {productTags.map((tags) => (
            <li
              key={tags.id}
              onClick={() => toggleTag(tags.id)}
              className={`cursor-pointer flex items-center rounded-[4px] font-medium border-[1px] p-[8px] gap-2 ${
                selectedTags.includes(tags.id)
                  ? "text-primary border-primary"
                  : "text-gray-700 border-gray-300"
              }`}
            >
              {tags.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularTag;