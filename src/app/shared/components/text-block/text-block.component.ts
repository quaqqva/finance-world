import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [NgClass, NgIf, NgTemplateOutlet],
  templateUrl: './text-block.component.html',
  styleUrl: './text-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBlockComponent {
  @Input({ required: true }) public heading!: string | TemplateRef<unknown>;

  public get headingAsTemplateRef(): TemplateRef<unknown> | null {
    return this.heading instanceof TemplateRef ? this.heading : null;
  }

  @Input() public description?: string | TemplateRef<unknown>;

  public get descriptionAsTemplateRef(): TemplateRef<unknown> | null {
    return this.description instanceof TemplateRef ? this.description : null;
  }

  @Input() public colorVariant: 'default' | 'bright' = 'default';

  @Input() public offsetDescription: boolean = false;

  @Input() public shadowEffect: 'duplicate' | 'normal' = 'normal';
}
