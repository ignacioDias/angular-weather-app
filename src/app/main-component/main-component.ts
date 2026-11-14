import { Component } from '@angular/core';
import { WeatherInfo } from '../weather-info/weather-info';
import { SearchCity } from '../search-city/search-city';
@Component({
  imports: [WeatherInfo, SearchCity],
  selector: 'app-main-component',
  styleUrl: './main-component.css',
  templateUrl: './main-component.html',
})
export class MainComponent {}
