
import { TMDB_API_TOKEN } from '@env';
const API_URL = 'https://api.themoviedb.org/3';
const POSTER_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_URL = 'https://image.tmdb.org/t/p/w185';
const getToken = () => TMDB_API_TOKEN || '';

const makeRequest = async (url: string, maxRetries: number = 3): Promise<any> => {
  const token = getToken();
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      return await res.json();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
      }
      
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

export async function fetchMovies(category: string, search: string, page: number = 1) {
  let url = `${API_URL}/movie/${category}?language=en-US&page=${page}`;
  if (search) url = `${API_URL}/search/movie?query=${encodeURIComponent(search)}&language=en-US&page=${page}`;
  if (!search && category === 'now_playing') {
    url += '&region=US';
  }
  return await makeRequest(url);
}

export async function fetchMovieDetails(id: string) {
  const url = `${API_URL}/movie/${id}?language=en-US`;
  return await makeRequest(url);
}

export async function fetchMovieCredits(id: string) {
  const url = `${API_URL}/movie/${id}/credits?language=en-US`;
  return await makeRequest(url);
}

export async function fetchMovieRecommendations(id: string) {
  const url = `${API_URL}/movie/${id}/recommendations?language=en-US&page=1`;
  return await makeRequest(url);
}

export async function fetchMovieReleaseDates(id: string) {
  const url = `${API_URL}/movie/${id}/release_dates`;
  return await makeRequest(url);
}

export { POSTER_URL, PROFILE_URL };
