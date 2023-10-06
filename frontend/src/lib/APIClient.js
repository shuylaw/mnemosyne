import axios from 'axios';

const API_ENDPOINT = "http://127.0.0.1:8000/";

class APIClient {
    client = axios.create({
        baseURL: API_ENDPOINT
    });

    get = async (url, params = {}) => {
        const response = await this.client.get(url, { params });
        return response.data;
    };

    post = async (url, payload) => {
        const response = await this.client.post(url, payload);
        return response.data;
    };

    patch = async (url, payload) => {
        const response = await this.client.patch(url, payload);
        return response.data;
    };

    delete = async (url) => {
        const response = await this.client.delete(url);
        return response.data;
    }
}

const apiClient = new APIClient();

export default apiClient;
