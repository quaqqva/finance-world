import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home-entry.component.html',
  styleUrl: './home-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeEntryComponent {}
