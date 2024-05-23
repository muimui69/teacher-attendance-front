// src/app/services/icon.service.ts
import { Injectable } from '@angular/core';
import {
  User,
  BookCopy,
  Presentation
} from 'lucide-angular';
import {  LucideIcons } from 'lucide-angular/icons/types';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public icons: LucideIcons = {
    user:User,
    book:BookCopy,
    subject:Presentation
  };

  constructor() { }

  public getIcons() {
    return this.icons;
  }

  public getIcon(name: string) {
    return this.icons[name] || null;
  }
}
