import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
  };
}

export class WeatherApiService {
  private http = inject(HttpClient);
  private url = 'https://api.open-meteo.com/v1/forecast';
  
  getWeather(latitude: number, longitude: number) {
    return httpResource<WeatherResponse>(() => ({
      url: this.url,
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m'
      }
    }));
  }
}
