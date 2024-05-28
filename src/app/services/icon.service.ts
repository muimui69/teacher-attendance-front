import { Injectable } from '@angular/core';
import {
  User,
  BookCopy,
  Presentation,
  GraduationCap,
  DoorOpen,
  University,
  FileText,
  ChevronDown,
  ChevronRight,
  CirclePlus,
} from 'lucide-angular';
import { LucideIcons } from 'lucide-angular/icons/types';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  public icons: LucideIcons = {
    user: User,
    book: BookCopy,
    subject: Presentation,
    graduation: GraduationCap,
    door: DoorOpen,
    university: University,
    file: FileText,
    chevronDown:ChevronDown,
    chevronRight:ChevronRight,
    circlePlus:CirclePlus
  };

  constructor() { }

  public getIcons() {
    return this.icons;
  }

  public getIcon(name: string) {
    return this.icons[name] || null;
  }
}
