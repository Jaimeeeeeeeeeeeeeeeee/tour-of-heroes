import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HeroDetailComponent } from './app/hero-detail/hero-detail.component';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  const routes: Routes = [
    { path: 'hero/:id', component: HeroDetailComponent }
  ];
  
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes) // 👈 ahora sí existe
    ]
  });