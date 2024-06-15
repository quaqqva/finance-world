import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
