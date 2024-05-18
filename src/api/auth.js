// auth.js
import apiManager from "@api/api_manager.js";

export async function loginUser(credentials) {
  try {
    const response = await apiManager.post(
      `/api/v1/auth.php/login`,
      credentials
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Login failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Login failed with error:", error);
    return false;
  }
}

export async function registerUser(userData) {
  try {
    const response = await apiManager.post(
      `/api/v1/auth.php/register`,
      userData
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Registration failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Registration failed with error:", error);
    return false;
  }
}

export async function changePassword(passwordData) {
  try {
    const response = await apiManager.post(
      `/api/v1/auth.php/password-change`,
      passwordData
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Password change failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Password change failed with error:", error);
    return false;
  }
}
