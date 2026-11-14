import { Component, computed, effect, inject, signal } from '@angular/core';
import { WeatherInfo } from '../weather-info/weather-info';
import { SearchCity } from '../search-city/search-city';
import { WeatherApiService, WeatherResponse } from '../weather-api-service';

@Component({
  imports: [WeatherInfo, SearchCity],
  selector: 'app-main-component',
  styleUrl: './main-component.css',
  templateUrl: './main-component.html',
})
export class MainComponent {

  protected weatherApiService = inject(WeatherApiService);
  private weatherResource = this.weatherApiService.getWeatherFromCurrentCity();

  protected currentWeather = signal<WeatherResponse | null>(null);

  private searchInProgress = signal(false);
  protected isLoading = computed(
    () => this.searchInProgress() || this.weatherResource.isLoading()
  );

  constructor() {
    effect(() => {
      this.currentWeather.set(this.weatherResource.value() ?? null);
    });
  }

  protected async onSearchQuery(query: string) {
    if (query == null || query.trim() === '') {
      return;
    }

    this.searchInProgress.set(true);
    try {
      await this.weatherApiService.generateCurrentCityFromName(query);
    } catch (error) {
      console.error('Failed to look up city:', error);
    } finally {
      this.searchInProgress.set(false);
    }
  }

}
