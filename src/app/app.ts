import { Component, signal } from '@angular/core';
import { MainComponent } from './main-component/main-component';

@Component({
  imports: [MainComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('weather-app');
}
