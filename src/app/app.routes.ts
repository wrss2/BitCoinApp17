import { Routes } from '@angular/router';
import {TabelaComponent} from "./tabela/tabela.component";
import {CryptoDetailComponent} from "./details/details.component";

export const routes: Routes = [
  {path: '', redirectTo: 'Notowania' , pathMatch: 'full'},
  {path: 'Notowania', component: TabelaComponent},
  {path: 'Notowania/:id', component: CryptoDetailComponent},
];
