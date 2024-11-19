import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ensure token is stored properly
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Utility function for handling API errors
const handleApiError = (error) => {
    console.error('API error:', error);
    const message = error.response?.data?.message || 'An unexpected error occurred';
    return { success: false, message };
};

// TEAM CRUD Operations
export const createTeam = async (teamData) => {
    try {
        const response = await api.post('/team', teamData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getTeams = async () => {
    try {
        const response = await api.get('/team');
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateTeam = async (teamId, teamData) => {
    try {
        const response = await api.put(`/team/${teamId}`, teamData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteTeam = async (teamId) => {
    try {
        await api.delete(`/team/${teamId}`);
        return { success: true };
    } catch (error) {
        return handleApiError(error);
    }
};

// PLAYER CRUD Operations
export const createPlayer = async (playerData) => {
    try {
        const response = await api.post('/player', playerData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getPlayers = async () => {
    try {
        const response = await api.get('/players');
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const updatePlayer = async (playerId, playerData) => {
    try {
        const response = await api.put(`/player/${playerId}`, playerData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const deletePlayer = async (playerId) => {
    try {
        await api.delete(`/player/${playerId}`);
        return { success: true };
    } catch (error) {
        return handleApiError(error);
    }
};

// FIXTURE CRUD Operations
export const createFixture = async (fixtureData) => {
    try {
        const response = await api.post('/fixture', fixtureData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getFixtures = async () => {
    try {
        const response = await api.get('/fixture');
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateFixture = async (fixtureId, fixtureData) => {
    try {
        const response = await api.put(`/fixture/${fixtureId}`, fixtureData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteFixture = async (fixtureId) => {
    try {
        await api.delete(`/fixture/${fixtureId}`);
        return { success: true };
    } catch (error) {
        return handleApiError(error);
    }
};

// ATTENDANCE CRUD Operations
export const addAttendance = async (attendanceData) => {
    try {
        const response = await api.post('/attendance', attendanceData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getAttendanceByFixture = async (fixtureId) => {
    try {
        const response = await api.get(`/attendance/fixture/${fixtureId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateAttendance = async (attendanceId, attendanceData) => {
    try {
        const response = await api.put(`/attendance/${attendanceId}`, attendanceData);
        return { success: true, data: response.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteAttendance = async (attendanceId) => {
    try {
        await api.delete(`/attendance/${attendanceId}`);
        return { success: true };
    } catch (error) {
        return handleApiError(error);
    }
};

export default api;
