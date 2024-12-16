
export interface Podcast {
    id: string;
    title: string;
    author: string;
  }

export interface GenericContextValue{
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}