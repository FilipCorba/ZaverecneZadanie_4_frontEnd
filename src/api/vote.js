import apiManager from "@api/api_manager.js";

export async function sendVote(data) {
  try {
    const response = await apiManager.post(`/api/v1/quiz.php/vote`, data);
    if (response.status === 200) {
      console.log(response); // Assuming response.data contains the JSON response
      return response;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}
