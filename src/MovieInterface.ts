// MovieInterface.ts

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    videoUrl: string;
    vote_count: number;
    vote_average: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    showOverview: boolean; // New property
  }
  export interface Cast {
    id: number;
    name: string;
    // Add any other properties you need for the cast
  }
  
  export interface Crew {
    id: number;
    name: string;
    job: string;
    // Add any other properties you need for the crew
  }
  
  
  