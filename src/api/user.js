//getUserByID

import apiManager from "@api/api_manager.js";

export async function getUserByID(userID) {
  try {
    const response = await apiManager.get(
      `/api/v1/auth.php/user?user-id=${userID}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}

export async function getAllUsers() {
  try {
    const response = await apiManager.get(`/api/v1/auth.php/users`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}

export async function updateUserRole(userID) {
  try {
    const response = await apiManager.put(
      `/api/v1/auth.php/role?userId=${userID}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}
