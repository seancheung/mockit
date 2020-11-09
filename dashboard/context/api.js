import axios from 'axios'
import { pluck } from './utils'

const http = axios.create({
    baseURL: window.location.pathname
})

export default http

export const ROUTE_KEYS = [
    'method',
    'path',
    'code',
    'bypass',
    'delay',
    'headers',
    'body',
    'proxy',
    'cond'
]

export function getRoutes(offset, limit) {
    return http.get('/routes', {
        params: {
            offset,
            limit
        }
    })
}

export function addRoute(data) {
    return http.post('/routes', pluck(data, ...ROUTE_KEYS))
}

export function deleteRoute(id) {
    return http.delete(`/routes/${id}`)
}

export function updateRoute(id, data) {
    return http.put(`/routes/${id}`, pluck(data, ...ROUTE_KEYS.slice(2)))
}

export function exportRoutes(type) {
    return http.get('/export', {
        headers: {
            accept: type
        }
    })
}

export function importRoutes(format, data) {
    return http.post('/import', {
        type: format,
        data
    })
}

export function getTemplate() {
    return http.get('/template')
}

export function checkRoute(method, path) {
    return http.head('/routes', {
        params: {
            method,
            path
        }
    })
}
