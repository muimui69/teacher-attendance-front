import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ThemeService {
    private theme: 'light' | 'dark' = 'light';

    constructor() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.theme = savedTheme as 'light' | 'dark';
        }
        this.applyTheme();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    private applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }
}
