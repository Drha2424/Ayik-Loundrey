// Otomatis ganti ke '/api' di Vercel, dan 'http://localhost:3000/api' saat offline/lokal
const API_URL = window.location.origin.includes('http') && !window.location.origin.includes('localhost')
    ? '/api'
    : 'http://localhost:3000/api';

// Token Management
const getToken = () => localStorage.getItem('ayik_token');
const setToken = (token) => localStorage.setItem('ayik_token', token);
const removeToken = () => localStorage.removeItem('ayik_token');

// Auto redirect if not logged in
const checkAuth = () => {
    const token = getToken();
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('login.html') || path === '/login';
    const isIndexPage = path.endsWith('index.html') || path === '/';

    if (!token && !isLoginPage && !isIndexPage) {
        window.location.href = isLoginPage ? 'login.html' : '/login.html';
    } else if (token && isLoginPage) {
        window.location.href = '/dashboard.html';
    }
};

checkAuth();

// Generic Fetch Wrapper
const fetchAPI = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                removeToken();
                window.location.href = '/login.html';
            }
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

const logout = () => {
    removeToken();
    window.location.href = '/login.html';
};