import React, { createContext, useState } from 'react'
import { GenericContextValue, Podcast } from './type'
import { initialValue } from './initialValues'

export const GenericContext = createContext<GenericContextValue>(initialValue)

export default function GenericContextProvider({ children }: any) {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const contextValue: GenericContextValue = {
        podcasts, 
        setPodcasts, 
        isLoading, 
        setIsLoading
    }
    return (
        <GenericContext.Provider value={contextValue}>
            {children}
        </GenericContext.Provider>)
}