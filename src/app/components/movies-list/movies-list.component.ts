import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie, MoviesService } from '../../services/MoviesService';
import { MovieComponent } from '../movie/movie.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, MovieComponent, FormsModule],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  public searchText = '';
  public inputNewMovie = '';

  public moviesList$ = new BehaviorSubject<Movie[]>([])
  private searchSubject = new Subject<string>();

  constructor(public moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.movies$.subscribe((movies) => {
      this.moviesList$.next(movies);
    })

    this.searchSubject.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => {
        if (value.length >= 3) {
          return this.moviesService.getMovies(value);
        } else {
          return this.moviesService.movies$;
        }
      })
    ).subscribe(movies => {
      this.moviesList$.next(movies);
    });
  }

  public onAddNewChange(value: string) {
    if (!value) {
      return;
    }

    this.moviesService.addMovie(value);
    this.inputNewMovie = '';
  }

  public onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  public trackById(_: number, item: Movie) {
    return item.id
  }

}
