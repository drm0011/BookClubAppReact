const API_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {}; // Handle empty response
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getReadingList = async (userId) => {
    const response = await fetch(`${API_URL}/readinglist?userId=${userId}`, {
        headers: getAuthHeaders()
    });
    return await handleResponse(response);
};

export const getReadingListItem = async (id) => {
    const response = await fetch(`${API_URL}/readinglist/${id}`, {
        headers: getAuthHeaders()
    });
    return await handleResponse(response);
};

export const createReadingListItem = async (item) => {
    const response = await fetch(`${API_URL}/readinglist`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
    });
    return await handleResponse(response);
};

export const getReadingListMetadata = async (userId) => {
    const response = await fetch(`${API_URL}/readinglist/metadata/${userId}`, {
        headers: getAuthHeaders()
    });
    return await handleResponse(response);
};

export const updateReadingListItem = async (id, item) => {
    const response = await fetch(`${API_URL}/readinglist/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
    });
    return await handleResponse(response);
};

export const deleteReadingListItem = async (id) => {
    const response = await fetch(`${API_URL}/readinglist/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return await handleResponse(response);
};

export const getChatHistory = async (readingListId) => {
    const response = await fetch(`${API_URL}/history/${readingListId}`, {
        headers: getAuthHeaders()
    });
    return await handleResponse(response);
};
