import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie, MoviesService } from '../../services/MoviesService';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
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
