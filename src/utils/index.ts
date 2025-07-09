import { MovieApiTypes } from "../types";

export const categories = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Popular', value: 'popular' },
];

export const sortOptions = [
  { label: 'By alphabetical order', value: 'alphabetical' },
  { label: 'By rating', value: 'rating' },
  { label: 'By release date', value: 'release_date' },
];

export const formatDate = (
  timestamp: string,
  format?: Intl.DateTimeFormatOptions,
): string => {
  return new Date(timestamp).toLocaleDateString(
    undefined,
    format || {
      dateStyle: 'long',
    },
  );
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getUSMovieRating = (releaseDates: MovieApiTypes.IMovieReleaseDates | null): string => {
  if (!releaseDates?.results) return '';
  
  const usReleases = releaseDates.results.find(
    (country: any) => country.iso_3166_1 === 'US'
  );
  
  if (!usReleases?.release_dates) return '';
  
  const theatricalRelease = usReleases.release_dates.find(
    (release: any) => release.type === 3 || release.type === 2
  );
  
  return theatricalRelease?.certification || '';
};

export const getDirectorsWriters = (credits: MovieApiTypes.IMovieCredits): {
  name: string;
  job: string;
}[] => {
  if (!credits?.crew) return [];
  
  const directorsAndWriters = credits.crew.filter((person: any) => 
    person.job === 'Writer' || 
    person.job === 'Director'
  );
  
  const groupedByName = directorsAndWriters.reduce((acc: any, person: any) => {
    if (!acc[person.name]) {
      acc[person.name] = {
        name: person.name,
        jobs: new Set([person.job])
      };
    } else {
      acc[person.name].jobs.add(person.job);
    }
    return acc;
  }, {});
  
  return Object.values(groupedByName).map((person: any) => ({
    name: person.name,
    job: Array.from(person.jobs).join(', ')
  }));
};