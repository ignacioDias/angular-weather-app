import { Component, output } from '@angular/core';
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
  protected readonly searchQueryOutput = output<string>();

  protected onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchQuery.set(inputValue);
  }

  protected onSearch(): void {
    this.searchQueryOutput.emit(this.searchQuery());
    this.searchQuery.set('');
  }
}
