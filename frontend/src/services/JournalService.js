import apiClient from "../lib/APIClient";

const JournalService = {
    async getAll() {
        const response = await apiClient.get('/entries');
        return response;
    },

    async get(id) {
        const response = await apiClient.get(`/entries/${id}`);
        return response;
    },

    async create(data) {
        const response = await apiClient.post('/entries', data);
        return response;
    },

    async update(id, data) {
        const response = await apiClient.patch(`/entries/${id}`, data);
        return response;
    },

    async delete(id) {
        const response = await apiClient.delete(`/entries/${id}`);
        return response;
    }
};

export default JournalService;
