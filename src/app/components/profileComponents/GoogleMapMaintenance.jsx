import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch available days
const fetchDays = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const response = await fetch(`${apiUrl}user/available-days/get-all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) throw new Error("Unauthorized: Please log in again");

  const data = await response.json();
  if (!data.success) throw new Error("Failed to fetch Days");

  return data.data;
};


const fetchTimes = async (dayId) => {
  const response = await fetch(`${apiUrl}available-times/get/${dayId}`);
  console.log(response);
  const data = await response.json();
  if (!data.success) throw new Error("Failed to fetch Times");

  return data.data.map((time) => time.time.slice(0, 5)); 
};

const GoogleMapMaintenance = () => {
  const queryClient = useQueryClient();
  const { data: availableDays, isLoading, isError } = useQuery({
    queryKey: ["days"],
    queryFn: fetchDays,
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [locationInput, setLocationInput] = useState("");

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    const selectedDay = availableDays.find((day) => day.date === selectedDate);
    if (selectedDay) {
      try {
        const times = await fetchTimes(selectedDay.id);
        setAvailableTimes(times);
      } catch (error) {
        setAvailableTimes([]);
      }
    } else {
      setAvailableTimes([]);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedMarker({ lat, lng });
    setLocationInput(`${lat}, ${lng}`);
  };

  return (
    <div>
      {isLoading && <p>Loading Days...</p>}
      {isError && <p>Error fetching Days</p>}

      {!isLoading && !isError && (
        <>
          <div className="flex gap-2">
            <div className="my-2 w-full">
              <label className="block mb-3 font-medium">الموقع</label>
              <input
                className="block mb-3 mt-1 focus:border-primary px-5 py-3 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                value={locationInput}
                readOnly
              />
            </div>
            <div className="my-2 w-full">
              <label className="block mb-3 font-medium">تاريخ الزيارة</label>
              <input
                className="block mb-3 mt-1 focus:border-primary px-5 py-3 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              
              />
            </div>
          </div>

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedMarker || { lat: 30.0131, lng: 31.2089 }}
            zoom={13}
            onClick={handleMapClick}
          >
            {selectedMarker && <Marker position={selectedMarker} />}
          </GoogleMap>

          <div className="my-3">
            <h3 className="text-md my-4 text-xl font-medium">وقت الزيارة</h3>
            <div className="my-4 flex flex-wrap text-md gap-3">
              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <span
                    key={index}
                    className="py-2 text-center md:w-28 w-24 rounded-full bg-primary text-white text-bold"
                  >
                    {time}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">لا توجد أوقات متاحة لهذا اليوم</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleMapMaintenance;
