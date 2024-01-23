import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() buttonTitle: string = '';
  @Input() buttonIcon: string = '';
  @Input() buttonVisible: boolean = false;

  @Output() buttonAction = new EventEmitter<string>();

  addNew() {
    this.buttonAction.emit();
  }
}
