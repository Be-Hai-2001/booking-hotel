// modules/user/infrastructure/storage/authStorage.js

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

const tokenStorage = {
    setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
    getToken: () => localStorage.getItem(TOKEN_KEY),

    setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
    getUser: () => {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    },

    getRole: () => tokenStorage.getUser()?.role ?? null,

    clear: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
    isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

export default tokenStorage;