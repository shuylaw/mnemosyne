import apiClient from "../lib/APIClient";

const JoplinService = {
    async getNotes(limit) {
        const response = await apiClient.get('/joplin/notes', { params: { "limit": limit } });
        return response;
    }
};

export default JoplinService
