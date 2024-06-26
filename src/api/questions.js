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

export async function updateQuestion(data) {
  const userID = localStorage.getItem("user_id");
  
  try {
    const response = await apiManager.put(
      `/api/v1/quiz.php/question?user-id=${userID}`,
      data
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

export async function getExport(participationID) {
  try {
const userID = localStorage.getItem("user_id");
    const response = await apiManager.get(
      `/api/v1/quiz.php/export?participation-id=${participationID}&user-id=${userID}`
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

export async function copyQuestion(questionID) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.post(
      `/api/v1/quiz.php/copy?user-id=${userID}&question-id=${questionID}`
    );
    if (response.status === 200) {
      return true
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}