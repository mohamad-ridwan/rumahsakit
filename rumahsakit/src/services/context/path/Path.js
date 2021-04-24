import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { useHistory } from 'react-router';

export const PathContext = createContext()

const PathProvider = ({ children }) => {

    const [paramsGlobal, setParamsGlobal] = useState('')

    function updateParams(path) {
        setParamsGlobal(`${path}`)
    }

    return (
        <PathContext.Provider value={[paramsGlobal, setParamsGlobal, updateParams]}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider