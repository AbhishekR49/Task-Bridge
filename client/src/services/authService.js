import apiClient from "./apiClient"

export const registerUser = async(userData)=>{
    const response = await apiClient.post('/auth/register', userData);

    return response.data;
}

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await apiClient.post("/auth/refresh");
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const getApplicantDashboard = async () => {
  const response = await apiClient.get("/dashboard/applicant");
  return response.data;
};

export const getPosterDashboard = async () => {
  const response = await apiClient.get("/dashboard/poster");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await apiClient.post("/tasks", taskData);
  return response.data;
};

export const getMyTasks = async () => {
  const response = await apiClient.get("/tasks/my-tasks");
  return response.data;
};

export const closeTask = async (taskId) => {
  const response = await apiClient.patch(`/tasks/${taskId}/close`);
  return response.data;
};

export const getTasks = async (params = {}) => {
  const response = await apiClient.get("/tasks", { params });
  return response.data;
};


export const getTaskById = async (taskId) => {
  const response = await apiClient.get(`/tasks/${taskId}`);
  return response.data;
};

export const applyToTask = async (taskId, applicationData) => {
  const formData = new FormData();

  formData.append("message", applicationData.message);
  formData.append("resume", applicationData.resume);

  const response = await apiClient.post(
    `/application/task/${taskId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getMyApplications = async () => {
  const response = await apiClient.get(
    "/application/my-applications"
  );

  return response.data;
};

export const getTaskApplications = async (taskId) => {
  const response = await apiClient.get(
    `/application/task/${taskId}`
  );

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await apiClient.patch(
    `/application/${applicationId}/status`,
    { status }
  );

  return response.data;
};

export const completeTask = async (taskId) => {
  const response = await apiClient.patch(
    `/tasks/${taskId}/complete`
  );

  return response.data;
};

export const getApplicationResume = async (applicationId) => {
  const response = await apiClient.get(
    `/application/${applicationId}/resume`
  );

  return response.data;
};
