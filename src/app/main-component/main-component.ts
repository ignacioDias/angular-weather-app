import { Component, inject } from '@angular/core';
import { WeatherInfo } from '../weather-info/weather-info';
import { SearchCity } from '../search-city/search-city';
import { WeatherApiService } from '../weather-api-service';
@Component({
  imports: [WeatherInfo, SearchCity],
  selector: 'app-main-component',
  styleUrl: './main-component.css',
  templateUrl: './main-component.html',
})
export class MainComponent {

  protected weatherApiService = inject(WeatherApiService);

  protected  onSearchQuery(query: string) {
    console.log('Search query received in MainComponent:', query);
  }
}
