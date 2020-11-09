import React, { createContext, useReducer } from 'react'
import * as api from './api'

const actions = {
    BEGIN: 'BEGIN',
    GET_ROUTES: 'GET_ROUTES',
    ADD_ROUTE: 'ADD_ROUTE',
    UPDATE_ROUTE: 'UPDATE_ROUTE',
    DELETE_ROUTE: 'DELETE_ROUTE',
    IMPORT_ROUTES: 'IMPORT_ROUTES'
}

const Context = createContext()

const initialState = {
    pending: false,
    error: null,
    index: 0,
    size: 10,
    count: 0,
    items: null
}

const reducer = (state, action) => {
    if (action.error) {
        return {
            ...state,
            pending: false,
            error: action.error
        }
    }
    switch (action.type) {
        case actions.BEGIN: {
            return {
                ...state,
                pending: true,
                error: null
            }
        }
        case actions.GET_ROUTES: {
            const { offset, limit, count, records } = action.payload
            return {
                ...state,
                pending: false,
                error: null,
                index: Math.ceil(offset / limit),
                size: limit,
                count,
                items: records
            }
        }
        case actions.ADD_ROUTE:
        case actions.UPDATE_ROUTE:
        case actions.DELETE_ROUTE:
        case actions.IMPORT_ROUTES:
            return {
                ...state,
                pending: false,
                error: null
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const fetch = dispatch => async (index, size) => {
    dispatch({ type: actions.BEGIN })
    let res, err
    try {
        res = await api.getRoutes(index * size, size)
    } catch (error) {
        err = error
    } finally {
        dispatch({
            type: actions.GET_ROUTES,
            error: err,
            payload: res
        })
    }
}

const create = dispatch => async data => {
    dispatch({ type: actions.BEGIN })
    let err
    try {
        await api.addRoute(data)
    } catch (error) {
        err = error
    } finally {
        dispatch({
            type: actions.ADD_ROUTE,
            error: err
        })
    }
}

const remove = dispatch => async id => {
    dispatch({ type: actions.BEGIN })
    let err
    try {
        await api.deleteRoute(id)
    } catch (error) {
        err = error
    } finally {
        dispatch({
            type: actions.DELETE_ROUTE,
            error: err
        })
    }
}

const update = dispatch => async (id, data) => {
    dispatch({ type: actions.BEGIN })
    let err
    try {
        await api.updateRoute(id, data)
    } catch (error) {
        err = error
    } finally {
        dispatch({
            type: actions.UPDATE_ROUTE,
            error: err
        })
    }
}

const load = dispatch => async (format, data) => {
    dispatch({ type: actions.BEGIN })
    let err
    try {
        await api.importRoutes(format, data)
    } catch (error) {
        err = error
    } finally {
        dispatch({
            type: actions.IMPORT_ROUTES,
            error: err
        })
    }
}

export const RoutesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const methods = {
        fetch: fetch(dispatch),
        create: create(dispatch),
        remove: remove(dispatch),
        update: update(dispatch),
        load: load(dispatch)
    }

    return (
        <Context.Provider value={[state, methods, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const useRoutes = () => {
    const context = React.useContext(Context)
    if (context === undefined) {
        throw new Error('useRoutes must be used within a RoutesProvider')
    }
    return context
}
