import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie, MoviesService } from '../../services/MoviesService';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit, DoCheck {
  @Input() movie!: Movie;

  constructor(public moviesService: MoviesService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.cdr.markForCheck();
  }
}
