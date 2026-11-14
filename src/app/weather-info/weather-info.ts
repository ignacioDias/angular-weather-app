import { Component, input } from '@angular/core';
import { WeatherResponse } from '../weather-api-service';
@Component({
  imports: [],
  selector: 'app-weather-info',
  styleUrl: './weather-info.css',
  templateUrl: './weather-info.html',
})
export class WeatherInfo {
  readonly currentWeather = input<WeatherResponse | null>(null);
  readonly isLoading = input(false);
}
