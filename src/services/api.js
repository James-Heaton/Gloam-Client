const API_URL = "http://localhost:8000";

// Get auth token from local storage
const getToken = () => {
  const auth = localStorage.getItem("gloam_token");
  return auth ? JSON.parse(auth).token : null;
};

// Generic fetch wrapper with auth
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Something went wrong");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Auth API calls
export const register = async (username, password) => {
  return apiRequest("/register", {
    method: "POST",
    body: JSON.stringify({username, password}),
  });
};

export const login = async (username, password) => {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({username, password}),
  });
};

// Characters API calls
export const getCharacterTypes = async () => {
  return apiRequest("/charactertypes");
};

export const getTraits = async () => {
  return apiRequest("/traits");
};

export const getCharacters = async () => {
  return apiRequest("/characters");
};

export const getCharacter = async (id) => {
  return apiRequest(`/characters/${id}`);
};

export const createCharacter = async (characterData) => {
  return apiRequest("/characters", {
    method: "POST",
    body: JSON.stringify(characterData),
  });
};

export const updateCharacter = async (id, characterData) => {
  return apiRequest(`/characters/${id}`, {
    method: "PUT",
    body: JSON.stringify(characterData),
  });
};

export const deleteCharacter = async (id) => {
  return apiRequest(`/characters/${id}`, {
    method: "DELETE",
  });
};

// Game API calls
export const getGameState = async () => {
  return apiRequest("/game/state");
};

export const executeAction = async (actionId, useStealthy = false) => {
  return apiRequest("/game/action", {
    method: "POST",
    body: JSON.stringify({
      action_id: actionId,
      use_stealthy: useStealthy,
    }),
  });
};

export const resetGame = async (characterId) => {
  return apiRequest("/game/reset", {
    method: "POST",
    body: JSON.stringify({
      character_id: characterId,
    }),
  });
};

export const setActiveCharacter = async (characterId) => {
  return apiRequest(`/characters/${characterId}/set-active`, {
    method: "POST",
  });
};