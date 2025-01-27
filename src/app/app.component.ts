import { Component, inject, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputSwitchModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  #document = inject(DOCUMENT);
  isDarkMode = false;
  readonly DARK_MODE_KEY = 'darkMode';
  readonly DARK_MODE_CLASS = 'dark';

  constructor(
  ) {
    this.initializeDarkMode();
    this.listenToSystemThemeChanges();
  }

  private initializeDarkMode(): void {
    const savedDarkMode = localStorage.getItem(this.DARK_MODE_KEY);
    const shouldEnableDarkMode = savedDarkMode === this.DARK_MODE_CLASS ||
      (this.isSystemDark() && savedDarkMode === null);
    if (shouldEnableDarkMode) {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }
  }

  private listenToSystemThemeChanges(): void {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (e.matches) {
          this.enableDarkMode();
        } else {
          this.enableLightMode();
        }
      });
  }

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }

  toggleLightDark(): void {
    if (this.isDarkMode) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode(): void {
    this.isDarkMode = true;
    localStorage.setItem(this.DARK_MODE_KEY, this.DARK_MODE_CLASS);
    const element = document.querySelector('html');
    element.classList.add(this.DARK_MODE_CLASS);
  }

  private enableLightMode(): void {
    this.isDarkMode = false;
    localStorage.removeItem(this.DARK_MODE_KEY);
    const element = document.querySelector('html');
    element.classList.remove(this.DARK_MODE_CLASS);
  }
}
