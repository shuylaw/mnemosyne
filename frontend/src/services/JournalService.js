import apiClient from "../lib/APIClient";

const JournalService = {
    async getAll() {
        const response = await apiClient.get('/entries');
        return response;
    },

    async get(id) {
        const response = await apiClient.get(`/entry/${id}`);
        return response;
    },

    async create(data) {
        const response = await apiClient.post('/entry', data);
        return response;
    },

    async update(id, data) {
        const response = await apiClient.patch(`/entry/${id}`, data);
        return response;
    },

    async delete(id) {
        const response = await apiClient.delete(`/entry/${id}`);
        return response;
    }
};

export default JournalService;
