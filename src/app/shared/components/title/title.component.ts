import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
})

export class TitleComponent {
  @Input({ required: true }) heading!: string;
  @Input() text?: string;
}
