export namespace MovieContextTypes {
  export type Category = 'now_playing' | 'upcoming' | 'popular';
  export type SortBy = 'alphabetical' | 'rating' | 'release_date';
  export interface IMovieContextProps {
    fetchMovies: () => void;
    loadMoreMovies: () => void;
    movies: MovieApiTypes.IMovie[];
    errorMessage: string;
    isLoading: boolean;
    isLoadingMore: boolean;
    hasMorePages: boolean;
    category: Category;
    setCategory: (c: Category) => void;
    sortBy: SortBy;
    setSortBy: (s: SortBy) => void;
    search: string;
    setSearch: (s: string) => void;
  }
}

export namespace MovieApiTypes {
  export interface IMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path?: string;
    vote_average: number;
  }
  export interface IMovieDetails extends IMovie {
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
    homepage: string;
    backdrop_path?: string;
    vote_count: number;
    status: string;
    spoken_languages: { iso_639_1: string; name: string }[];
  }

  export interface IMovieRes {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
  }

  export interface ICastMember {
    id: number;
    name: string;
    character: string;
    profile_path?: string;
  }

  export interface ICrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path?: string;
  }

  export interface IMovieCredits {
    cast: ICastMember[];
    crew: ICrewMember[];
  }

  export interface IReleaseDate {
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  }

  export interface IReleaseDateResult {
    iso_3166_1: string;
    release_dates: IReleaseDate[];
  }

  export interface IMovieReleaseDates {
    results: IReleaseDateResult[];
  }
}

export namespace DetailsContextTypes {
  export interface IDetailsContextProps {
    movie: MovieApiTypes.IMovieDetails | null;
    credits: MovieApiTypes.IMovieCredits | null;
    releaseDates: MovieApiTypes.IMovieReleaseDates | null;
    recommendations: MovieApiTypes.IMovie[];
    loading: boolean;
    error: string;
    fetchDetails: (id: string) => void;
  }
}
