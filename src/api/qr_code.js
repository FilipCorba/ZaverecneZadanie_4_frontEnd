// qr_code.js
import apiManager from "@api/api_manager.js";

export async function getQrCode(qrCodeId) {
  try {
    const response = await apiManager.get(
      `/api/v1/quiz.php/qr_code?qrCodeId=${qrCodeId}`
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

export async function generateQR(participation_id, code) {
  try {
    if (!code) {
      const response = await apiManager.get(
        `/api/v1/quiz.php/generate-qr?participation-id=${participation_id}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Request failed with status:", response.status);
        return false;
      }
    } else {
      const response = await apiManager.get(
        `/api/v1/quiz.php/generate-qr?participation-id=${participation_id}&code=${code}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Request failed with status:", response.status);
        return false;
      }
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}

export async function deleteQrCode(qrCodeId) {
  try {
    const response = await apiManager.delete(
      `/api/v1/quiz.php/qr_code?qrCodeId=${qrCodeId}`
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
