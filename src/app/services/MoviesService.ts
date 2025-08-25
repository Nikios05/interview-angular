import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from 'rxjs';
import { MoviesMockData } from '../helpers/moviesMock';

export interface Movie {
  id: number;
  name: string;
  isOnline: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public movies$ = new BehaviorSubject<Movie[]>(MoviesMockData);

  public getMovies(searchName: string) {
    return this.movies$.pipe(map(arr => arr.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()))))
  }

  public addMovie(name: string) {
    const newMovie: Movie = {
      id: this.movies$.value.length + 1,
      name,
      isOnline: false,
    }

    this.movies$.next([...this.movies$.value, newMovie]);
  }

  public updateMovie(movie: Movie) {
    const updatedMovies = this.movies$.value.map((m) =>
      m.id === movie.id ? movie : m
    );

    this.movies$.next(updatedMovies);
  }

  public deleteMovie(id: number) {
    const updatedMovies = this.movies$.value.filter((m) => m.id !== id);

    this.movies$.next(updatedMovies);
  }

  public updateAllMoviesStatus() {
    const updatedMovies = this.movies$.value.map((m) => {
        return {
          ...m,
          isOnline: true,
        }
      }
    );

    this.movies$.next(updatedMovies);
  }
}
