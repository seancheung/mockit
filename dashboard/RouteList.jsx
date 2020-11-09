import React, { useEffect } from 'react'
import { useTemplate } from './context'

const RouteList = () => {
    const [template, { fetch }] = useTemplate()
    useEffect(async () => {
        await fetch()
    }, [])
    console.log(template)
    return <></>
}

export default RouteList
