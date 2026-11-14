import { Component } from '@angular/core';
import { signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'

@Component({
  imports: [MatIconModule],
  selector: 'app-search-city',
  styleUrl: './search-city.css',
  templateUrl: './search-city.html',
})
export class SearchCity {

  protected searchQuery = signal('');

  protected onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchQuery.set(inputValue);
  }

  protected onSearch(): void {
    console.log('Search query:', this.searchQuery());
  }
}
