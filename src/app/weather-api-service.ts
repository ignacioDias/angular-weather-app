import { HttpClient, httpResource } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
  };
}

export type City = {
  latitude: number;
  longitude: number;
  name: string;
}

interface GeocodingResponse {
  results?: City[];
}

@Service()
export class WeatherApiService {
  private http = inject(HttpClient);
  private searchNameURL = 'https://geocoding-api.open-meteo.com/v1/';
  private currentCity = signal<City | null>(null);
  private weatherURL = 'https://api.open-meteo.com/v1/forecast';

  generateCurrentCityFromName(city: string): Promise<City | null> {
    const encodedCity = this.encodeCityName(city);
    return firstValueFrom(
      this.http.get<GeocodingResponse>(
        `${this.searchNameURL}search?name=${encodedCity}`
      )
    ).then((response) => {
      this.currentCity.set(response.results?.[0] ?? null);
      console.log('Current city set to:', this.currentCity());
      return this.currentCity();
    });
  }

  private encodeCityName(city: string): string {
    return encodeURIComponent(city.trim());
  }

  getWeatherFromCurrentCity() {
    return httpResource<WeatherResponse>(() => {
      const city = this.currentCity();
      if (!city) {
        return undefined;
      }
      const params = new URLSearchParams({
        latitude: String(city.latitude),
        longitude: String(city.longitude),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m'
      });
      return `${this.weatherURL}?${params.toString()}`;
    });
  }
}
