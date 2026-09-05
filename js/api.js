const API_URL = 'http://localhost:3000/api';

// Token Management
const getToken = () => localStorage.getItem('ayik_token');
const setToken = (token) => localStorage.setItem('ayik_token', token);
const removeToken = () => localStorage.removeItem('ayik_token');

// Auto redirect if not logged in
const checkAuth = () => {
    const token = getToken();
    const isLoginPage = window.location.pathname.endsWith('login.html');
    const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    
    if (!token && !isLoginPage && !isIndexPage) {
        window.location.href = 'login.html';
    } else if (token && (isLoginPage || isIndexPage)) {
        // Option: Redirect to dashboard if trying to access login while authenticated
        if (isLoginPage) window.location.href = 'dashboard.html';
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
                window.location.href = 'login.html';
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
    window.location.href = 'login.html';
};
