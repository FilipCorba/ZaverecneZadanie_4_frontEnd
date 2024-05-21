import apiManager from "@api/api_manager.js";

export async function getListOfQuizzes() {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.get(
      `/api/v1/quiz.php/quiz-list?user-id=${userID}`
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

export async function getListOfAllQuizzes() {
  try {
    const response = await apiManager.get(`/api/v1/quiz.php/all-quiz-list`);
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

export async function getQuizById(quizID) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.get(
      `/api/v1/quiz.php/quiz?user-id=${userID}&quiz-id=${quizID}`
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

export async function postQuiz(data) {
  try {
    const response = await apiManager.post(`/api/v1/quiz.php/quiz`, {
      data: data,
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

export async function activateQuizById(quizID) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.post(
      `/api/v1/quiz.php/start-vote?user-id=${userID}&quiz-id=${quizID}`
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

export async function getVotingListOfQuizzes(quizID) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.get(
      `/api/v1/quiz.php/voting-list?user-id=${userID}&quiz-id=${quizID}`
    );
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error("Request failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Request failed with error:", error);
    return false;
  }
}

export async function getSurveyQuiz(surveyCode) {
  try {
    const response = await apiManager.get(
      `/api/v1/quiz.php/survey?code=${surveyCode}`
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

export async function deactivateSurveyById(data) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.post(
      `/api/v1/quiz.php/end-vote?user-id=${userID}`,
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

export async function deleteQuizById(quizID) {
  const userID = localStorage.getItem("user_id");
  try {
    const response = await apiManager.delete(
      `/api/v1/quiz.php/quiz?user-id=${userID}&quiz-id=${quizID}`
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

