import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUserDetails = async () => {
  const response = await fetch(`${apiUrl}user/get-details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  const data = await response.json();
  console.log("Response: ", data);
  return data;
};

export const updateProfile = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}user/update-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    console.log("Profile updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const updateUserPhone = async (phone) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${apiUrl}user/update-user-phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phone }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "حدث خطأ أثناء إرسال OTP");
    }

    return responseData;
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw error;
  }
};


export const updateUserEmail = async (email) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${apiUrl}user/update-user-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData?.message || "حدث خطأ أثناء إرسال OTP");
    }

    return responseData;
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw error;
  }
};