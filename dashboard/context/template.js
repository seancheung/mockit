import React, { createContext, useReducer } from 'react'
import * as api from './api'

const actions = {
    BEGIN: 'BEGIN',
    GET_TEMPLATE: 'GET_TEMPLATE'
}

const Context = createContext()

const initialState = {
    pending: false,
    error: null,
    item: null
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
        case actions.GET_TEMPLATE: {
            return {
                ...state,
                pending: false,
                error: null,
                item: action.payload
            }
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const fetch = dispatch => async () => {
    dispatch({ type: actions.BEGIN })
    let res, err
    try {
        res = await api.getTemplate()
    } catch (error) {
        err = error
    } finally {
        dispatch({
            type: actions.GET_TEMPLATE,
            error: err,
            payload: res
        })
    }
}

export const TemplateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const methods = {
        fetch: fetch(dispatch)
    }

    return (
        <Context.Provider value={[state, methods, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const useTemplate = () => {
    const context = React.useContext(Context)
    if (context === undefined) {
        throw new Error('useTemplate must be used within a TemplateProvider')
    }
    return context
}
