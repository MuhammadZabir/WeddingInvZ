import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';

export const routes: Routes = [
    { path: 'page1', component: FirstPageComponent, data: { animation: 'Page1'} },
    { path: 'page2', component: SecondPageComponent, data: { animation: 'Page2'} },
    { path: 'page3', component: ThirdPageComponent, data: { animation: 'Page3'} },
    { path: '', redirectTo: '/page1', pathMatch: 'full' },
];
