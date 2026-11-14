import { Component, computed, input } from '@angular/core';
import { WeatherResponse } from '../weather-api-service';

const WIND_NAMES = [
  'Calm',
  'Light air',
  'Light breeze',
  'Gentle breeze',
  'Moderate breeze',
  'Fresh breeze',
  'Strong breeze',
  'Near gale',
  'Gale',
  'Strong gale',
  'Storm',
  'Violent storm',
  'Hurricane',
];

// Upper bound of each Beaufort force in km/h; anything above the last is force 12.
const BEAUFORT_LIMITS = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];

const CONDITION_LABELS: Record<string, string> = {
  clear_day: 'Clear sky',
  partly_cloudy_day: 'Partly cloudy',
  cloud: 'Cloudy',
  foggy: 'Fog',
  rainy: 'Rain',
  weather_snowy: 'Snow',
  thunderstorm: 'Thunderstorm',
  weather_hail: 'Hail',
};

function beaufortLevel(kmh: number): number {
  const index = BEAUFORT_LIMITS.findIndex((limit) => kmh < limit);
  return index === -1 ? 12 : index;
}

// Maps WMO weather codes to Material Symbols names.
function weatherIconFor(code: number | undefined): string {
  if (code === undefined) return 'cloud';
  if (code === 0) return 'clear_day';
  if (code === 1 || code === 2) return 'partly_cloudy_day';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'foggy';
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return 'rainy';
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'weather_snowy';
  if (code === 95) return 'thunderstorm';
  if (code === 96 || code === 99) return 'weather_hail';
  return 'cloud';
}

@Component({
  imports: [],
  selector: 'app-weather-info',
  styleUrl: './weather-info.css',
  templateUrl: './weather-info.html',
})
export class WeatherInfo {
  readonly currentWeather = input<WeatherResponse | null>(null);
  readonly isLoading = input(false);

  protected readonly windSegments = Array.from({ length: 12 }, (_, index) => index + 1);

  protected readonly weatherIcon = computed(() =>
    weatherIconFor(this.currentWeather()?.current.weather_code)
  );

  protected readonly conditionLabel = computed(
    () => CONDITION_LABELS[this.weatherIcon()] ?? 'Cloudy'
  );

  protected readonly isSunny = computed(() => {
    const code = this.currentWeather()?.current.weather_code;
    return code === 0 || code === 1;
  });

  protected readonly windLevel = computed(() =>
    beaufortLevel(this.currentWeather()?.current.wind_speed_10m ?? 0)
  );

  protected readonly windName = computed(() => WIND_NAMES[this.windLevel()]);
}
