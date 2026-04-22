const AUTH_SESSION_KEY = "edostavka-auth";
const AUTH_USERS_KEY = "edostavka-users";

const readJson = (key, fallbackValue) => {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    return fallbackValue;
  }
};

export const getSavedSession = () => readJson(AUTH_SESSION_KEY, null);

export const saveSession = (session) => {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
};

export const clearSession = () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
};

export const getRegisteredUsers = () => readJson(AUTH_USERS_KEY, []);

const saveRegisteredUsers = (users) => {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email) =>
  getRegisteredUsers().find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase()
  );

export const registerUser = (userData) => {
  const users = getRegisteredUsers();
  const nextUsers = [...users, userData];
  saveRegisteredUsers(nextUsers);
};

export const findUserByCredentials = (email, password) =>
  getRegisteredUsers().find(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase() &&
      user.password === password
  );

export const updateRegisteredUser = (accountEmail, nextUserData) => {
  const users = getRegisteredUsers();
  const nextUsers = users.map((user) => {
    if (user.email.toLowerCase() !== accountEmail.trim().toLowerCase()) {
      return user;
    }

    return {
      ...user,
      ...nextUserData,
    };
  });

  saveRegisteredUsers(nextUsers);
};

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
