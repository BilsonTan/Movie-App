import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MovieApiTypes, MovieContextTypes } from '../types';
import { fetchMovies as fetchMoviesApi } from '../api/tmdb';

const MovieContext = createContext<
  MovieContextTypes.IMovieContextProps | undefined
>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [category, setCategoryState] =
    useState<MovieContextTypes.Category>('now_playing');
  const [sortBy, setSortByState] =
    useState<MovieContextTypes.SortBy>('release_date');
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<MovieApiTypes.IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [storedCategory, storedSortBy] = await Promise.all([
          AsyncStorage.getItem('category'),
          AsyncStorage.getItem('sortBy')
        ]);
        
        if (storedCategory) setCategoryState(storedCategory as MovieContextTypes.Category);
        if (storedSortBy) setSortByState(storedSortBy as MovieContextTypes.SortBy);
      } catch (error) {
        console.warn('Failed to load settings from storage:', error);
      }
    };
    
    loadSettings();
  }, []);

  const sortMovies = useCallback((movieList: MovieApiTypes.IMovie[], sortType: MovieContextTypes.SortBy) => {
    const sorted = [...movieList];
    
    switch (sortType) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case 'release_date':
        return sorted.sort((a, b) =>
          (b.release_date || '').localeCompare(a.release_date || '')
        );
      default:
        return sorted;
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setCurrentPage(1);
    setMovies([]);
    setErrorMessage('');
    
    try {

      const data = await fetchMoviesApi(category, search, 1);
      
      if (!data.results || data.results.length === 0) {
        setErrorMessage('No movies found.');
        setMovies([]);
        setHasMorePages(false);
      } else {
        const sortedMovies = sortMovies(data.results, sortBy);
        const limitedMovies = sortedMovies.slice(0, 5);
        
        setMovies(limitedMovies);
        setCurrentPage(1);
        setHasMorePages(data.total_pages > 1);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setErrorMessage('Failed to fetch movies.');
      setHasMorePages(false);
    } finally {
      setIsLoading(false);
    }
  }, [category, search, sortBy, sortMovies]);

  const loadMoreMovies = useCallback(async () => {
    if (isLoadingMore || !hasMorePages) {
      return;
    }

    setIsLoadingMore(true);
    setErrorMessage('');
    
    try {
      const nextPage = currentPage + 1;
      const data = await fetchMoviesApi(category, search, nextPage);
      
      if (data.results && data.results.length > 0) {
        const sortedMovies = sortMovies(data.results, sortBy);
        const limitedMovies = sortedMovies.slice(0, 5);
        
        setMovies(prevMovies => {
          const newMovies = [...prevMovies, ...limitedMovies];
          return newMovies;
        });
        setCurrentPage(nextPage);
        setHasMorePages(nextPage < data.total_pages);
      } else {
        setHasMorePages(false);
      }
    } catch (error) {
      console.error('Failed to load more movies:', error);
      setErrorMessage('Failed to load more movies.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMorePages, currentPage, category, search, sortBy, sortMovies]);

  const setCategory = useCallback((c: MovieContextTypes.Category) => {
    setCategoryState(c);
    AsyncStorage.setItem('category', c).catch(error => 
      console.warn('Failed to save category to storage:', error)
    );
  }, []);

  const setSortBy = useCallback((s: MovieContextTypes.SortBy) => {
    setSortByState(s);
    AsyncStorage.setItem('sortBy', s).catch(error => 
      console.warn('Failed to save sortBy to storage:', error)
    );
  }, []);

  const contextValue = useMemo(() => ({
    fetchMovies,
    loadMoreMovies,
    movies,
    errorMessage,
    isLoading,
    isLoadingMore,
    hasMorePages,
    category,
    setCategory,
    sortBy,
    setSortBy,
    search,
    setSearch,
  }), [
    fetchMovies,
    loadMoreMovies,
    movies,
    errorMessage,
    isLoading,
    isLoadingMore,
    hasMorePages,
    category,
    setCategory,
    sortBy,
    setSortBy,
    search
  ]);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, category]);

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const ctx = useContext(MovieContext);
  if (!ctx)
    throw new Error('useMovieContext must be used within MovieProvider');
  return ctx;
};
