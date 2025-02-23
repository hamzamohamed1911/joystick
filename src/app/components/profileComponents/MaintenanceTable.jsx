"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie"; 

const fetchData = async (type) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${apiUrl}History/GetAll?type=${type}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "lang":"ar"
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: Please log in again");
  }

  const data = await response.json();
  if (!data.success) throw new Error("Failed to fetch Data");
console.log(data);

  return data.data || [];
};

const MaintenanceTable = () => {
  const router = useRouter();

  // Pass the 'repair' parameter to fetchData
  const { data, error, isLoading } = useQuery({
    queryKey: ['repair'],  // Use an array as queryKey
    queryFn: () => fetchData("repair"),  // Pass 'repair' as a parameter
  });

  const handleRowClick = (row) => {
    // router.push(`/profile/previous-requests/${row.id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #D9D5EC", borderRadius: "4px" }}>
      <Table aria-label="maintenance table" sx={{ direction: "rtl" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>الرقم</TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>اسم الطلب</TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>التاريخ</TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>الحالة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{row.code}</TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>طلب صيانة</TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{row.created_at}</TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaintenanceTable;
