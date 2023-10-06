import apiClient from "../lib/APIClient";

const JournalService = {
    async getAll() {
        const response = await apiClient.get('/entries');
        return response.data;
    },

    async get(id) {
        const response = await apiClient.get(`/entries/${id}`);
        return response.data;
    },

    async create(data) {
        const response = await apiClient.post('/entries', data);
        return response.data;
    },

    async update(id, data) {
        const response = await apiClient.patch(`/entries/${id}`, data);
        return response.data;
    },

    async delete(id) {
        const response = await apiClient.delete(`/entries/${id}`);
        return response.data;
    }
};

export default JournalService;
