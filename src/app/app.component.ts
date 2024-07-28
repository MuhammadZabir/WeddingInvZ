import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FirstPageComponent, NgbModule, RouterOutlet, SecondPageComponent, ThirdPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  title = 'WeddingInvZ';
  currentPageIndex = 0;
  pagePaths = ['page1', 'page2', 'page3'];
  isScrolling = false;
  touchStartY = 0;
  touchEndY = 0;

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling) return;

    this.isScrolling = true;

    if (event.deltaY > 0) {
      this.nextPage();
    } else if (event.deltaY < 0) {
      this.previousPage();
    }

    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.touchEndY = event.touches[0].clientY;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.isScrolling) return;

    if (this.touchStartY - this.touchEndY > 50) {
      this.isScrolling = true;
      this.nextPage();
    } else if (this.touchEndY - this.touchStartY > 50) {
      this.isScrolling = true;
      this.previousPage();
    }

    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  nextPage() {
    if (this.currentPageIndex < this.pagePaths.length - 1) {
      this.currentPageIndex++;
      this.router.navigate([this.pagePaths[this.currentPageIndex]]).then(() => {
        this.isScrolling = false;
      });
    } else {
      this.isScrolling = false;
    }
  }

  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.router.navigate([this.pagePaths[this.currentPageIndex]]).then(() => {
        this.isScrolling = false;
      });
    } else {
      this.isScrolling = false;
    }
  }
}
