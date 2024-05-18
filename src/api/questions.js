import apiManager from "@api/api_manager.js";

export async function deleteQuestion(quizID, questionID) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.delete(
      `/api/v1/quiz.php/question?user-id=${userID}&quiz-id=${quizID}&question-id=${questionID}`
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
