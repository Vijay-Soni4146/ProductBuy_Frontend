import secureLocalStorage from "react-secure-storage";

const AUTH_LOCAL_STORAGE_KEY = "auth-user-v";
const AUTH_LOCAL_STORAGE_USER_KEY = "auth-user";
const getAuth = () => {
  if (!secureLocalStorage) {
    return null;
  }
  const lsValue = secureLocalStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return null;
  }
  try {
    const auth = JSON.parse(lsValue);
    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
  return null;
};
const setAuth = (auth) => {
  if (!secureLocalStorage) {
    return;
  }
  try {
    const lsValue = JSON.stringify(auth);
    secureLocalStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};
const removeAuth = () => {
  if (!secureLocalStorage) {
    return;
  }
  try {
    secureLocalStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};
const getUser = () => {
  if (!secureLocalStorage) {
    return;
  }
  const lsValue = secureLocalStorage.getItem(AUTH_LOCAL_STORAGE_USER_KEY);
  if (!lsValue) {
    return;
  }
  try {
    const auth = JSON.parse(lsValue);
    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};
const setUser = (auth) => {
  if (!secureLocalStorage) {
    return;
  }
  try {
    const lsValue = JSON.stringify(auth);
    secureLocalStorage.setItem(AUTH_LOCAL_STORAGE_USER_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeUser = () => {
  if (!secureLocalStorage) {
    return;
  }
  try {
    secureLocalStorage.removeItem(AUTH_LOCAL_STORAGE_USER_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};
export {
  getAuth,
  setAuth,
  removeAuth,
  AUTH_LOCAL_STORAGE_KEY,
  getUser,
  setUser,
  removeUser,
  AUTH_LOCAL_STORAGE_USER_KEY,
};
