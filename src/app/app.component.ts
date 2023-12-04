import {Component, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./ui-components/footer/footer.component";
import {HeaderComponent} from "./ui-components/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {BitcoinService} from "./services/bitcoin.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'BitCoin17';
}
