const API_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {}; // Handle empty response
};

export const getReadingList = async (userId) => {
    const response = await fetch(`${API_URL}/readinglist?userId=${userId}`);
    return await handleResponse(response);
};

export const getReadingListItem = async (id) => {
    const response = await fetch(`${API_URL}/readinglist/${id}`);
    return await handleResponse(response);
};

export const createReadingListItem = async (item) => {
    const response = await fetch(`${API_URL}/readinglist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    return await handleResponse(response);
};

export const updateReadingListItem = async (id, item) => {
    const response = await fetch(`${API_URL}/readinglist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    return await handleResponse(response);
};

export const deleteReadingListItem = async (id) => {
    const response = await fetch(`${API_URL}/readinglist/${id}`, {
        method: 'DELETE',
    });
    return await handleResponse(response);
};
