import apiManager from "@api/api_manager.js";

export async function getStatistics(participationID) {
  try {
    const response = await apiManager.get(
      `/api/v1/quiz.php/statistics?participation-id=${participationID}`
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
