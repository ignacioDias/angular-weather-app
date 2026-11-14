import { Component, signal } from '@angular/core';
import { WeatherResponse } from '../weather-api-service';
@Component({
  imports: [],
  selector: 'app-weather-info',
  styleUrl: './weather-info.css',
  templateUrl: './weather-info.html',
})
export class WeatherInfo {
  protected currentWeather = signal<WeatherResponse | null>(null);

  protected updateWeather(weather: WeatherResponse | null) {
    this.currentWeather.set(weather);
  }
}
