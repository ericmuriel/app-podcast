import React, { createContext, useState } from 'react'
import { GenericContextValue } from './type'
import { initialValue } from './initialValues'

export const GenericContext = createContext<GenericContextValue>(initialValue)

export default function GenericContextProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const contextValue: GenericContextValue = {
        isLoading, 
        setIsLoading
    }
    return (
        <GenericContext.Provider value={contextValue}>
            {children}
        </GenericContext.Provider>)
}