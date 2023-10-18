import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Adicione esta linha

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';

const routes: Routes = [
  { path: 'list-usuarios', component: ListUsuariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
