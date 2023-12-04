import {Component, ElementRef, HostListener} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'custom-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.scss'
})
export class CustomDropdownComponent {

  showMobile = false
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showMobile  = false;
    }
  }
  constructor(private elementRef: ElementRef) {}
  dropdownShow(){
    this.showMobile = !this.showMobile
  }
}
