import axios from 'axios';

const http = axios.create({
    baseURL: BASE_URL
});

export default http;

export function listRoutes(offset, limit) {
    return http.get('/routes', {
        params: {
            offset,
            limit
        }
    });
}

export function insertRoute(data) {
    return http.post('/routes', data);
}

export function removeRoute(id) {
    return http.delete(`/routes/${id}`);
}

export function updateRoute(id, data) {
    return http.put(`/routes/${id}`, data);
}

export function dumpRoutes() {
    return http.get('/export');
}

export function loadRoutes(data) {
    return http.post('/import', data);
}

export function getTemplate() {
    return http.get('/template');
}

export function checkRoute(method, path) {
    return http.head('/routes', {
        params: {
            method,
            path
        }
    });
}
