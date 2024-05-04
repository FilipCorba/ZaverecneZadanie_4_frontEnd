// qr_code.js
import apiManager from "@api/api_manager.js";

export async function getQrCode(qrCodeId) {
  try {
    const response = await apiManager.get(
      `/api/v1/generate.php/qr_code?qrCodeId=${qrCodeId}`
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

export async function postQrCode(data) {
  try {
    const response = await apiManager.post(`/api/v1/generate.php`, {
      text: data,
    });
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

export async function deleteQrCode(qrCodeId) {
  try {
    const response = await apiManager.delete(
      `/api/v1/generate.php/qr_code?qrCodeId=${qrCodeId}`
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
