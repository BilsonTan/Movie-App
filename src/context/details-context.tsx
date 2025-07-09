import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieRecommendations, fetchMovieReleaseDates } from '../api/tmdb';
import { DetailsContextTypes, MovieApiTypes } from '../types';

const DetailsContext = createContext<DetailsContextTypes.IDetailsContextProps | undefined>(undefined);

interface DetailsProviderProps {
  children: ReactNode;
}

export const DetailsProvider = ({ children }: DetailsProviderProps) => {
  const [movie, setMovie] = useState<MovieApiTypes.IMovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieApiTypes.IMovieCredits | null>(null);
  const [releaseDates, setReleaseDates] = useState<MovieApiTypes.IMovieReleaseDates | null>(null);
  const [recommendations, setRecommendations] = useState<MovieApiTypes.IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [cache, setCache] = useState<Map<string, {
    movie: MovieApiTypes.IMovieDetails;
    credits: MovieApiTypes.IMovieCredits;
    releaseDates: MovieApiTypes.IMovieReleaseDates;
    recommendations: MovieApiTypes.IMovie[];
    timestamp: number;
  }>>(new Map());

  const CACHE_EXPIRY = 5 * 60 * 1000;

  const isCacheValid = useCallback((timestamp: number) => {
    return Date.now() - timestamp < CACHE_EXPIRY;
  }, [CACHE_EXPIRY]);

  const fetchDetails = useCallback(async (id: string) => {
    if (!id) return;
    
    const cachedData = cache.get(id);
    if (cachedData && isCacheValid(cachedData.timestamp)) {
      setMovie(cachedData.movie);
      setCredits(cachedData.credits);
      setReleaseDates(cachedData.releaseDates);
      setRecommendations(cachedData.recommendations);
      setError('');
      return;
    }
    
    setLoading(true);
    setError('');
    setMovie(null);
    setCredits(null);
    setReleaseDates(null);
    setRecommendations([]);
    
    try {
      const [movieData, creditsData, recommendationsData, releaseDatesData] = await Promise.all([
        fetchMovieDetails(id),
        fetchMovieCredits(id),
        fetchMovieRecommendations(id),
        fetchMovieReleaseDates(id)
      ]);
      
      const processedRecommendations = recommendationsData.results || [];
      
      setCache(prevCache => {
        const newCache = new Map(prevCache);
        newCache.set(id, {
          movie: movieData,
          credits: creditsData,
          releaseDates: releaseDatesData,
          recommendations: processedRecommendations,
          timestamp: Date.now()
        });
        
        if (newCache.size > 10) {
          const entries = Array.from(newCache.entries());
          entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
          const toKeep = entries.slice(0, 10);
          return new Map(toKeep);
        }
        
        return newCache;
      });
      
      setMovie(movieData);
      setCredits(creditsData);
      setRecommendations(processedRecommendations);
      setReleaseDates(releaseDatesData);
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
      setError('Failed to fetch movie details.');
    } finally {
      setLoading(false);
    }
  }, [cache, isCacheValid]);

  const clearCache = useCallback(() => {
    setCache(new Map());
  }, []);

  const contextValue = useMemo(() => ({
    movie,
    credits,
    releaseDates,
    recommendations,
    loading,
    error,
    fetchDetails,
    clearCache,
  }), [
    movie,
    credits,
    releaseDates,
    recommendations,
    loading,
    error,
    fetchDetails,
    clearCache
  ]);

  return (
    <DetailsContext.Provider value={contextValue}>
      {children}
    </DetailsContext.Provider>
  );
};

export const useDetailsContext = () => {
  const context = useContext(DetailsContext);
  if (!context) {
    throw new Error('useDetailsContext must be used within DetailsProvider');
  }
  return context;
};
