import {Component, ElementRef, HostListener} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CustomDropdownComponent} from "../custom-dropdown/custom-dropdown.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor() {}
}
