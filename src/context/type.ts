
export interface Podcast {
    id: string;
    title: string;
    author: string;
  }

export interface GenericContextValue{
    podcasts: Podcast[];
    setPodcasts: React.Dispatch<React.SetStateAction<Podcast[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}