import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { MusicPlayerComponent } from './music-player/music-player.component'; 

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FirstPageComponent, MusicPlayerComponent, NgbModule, RouterOutlet, SecondPageComponent, ThirdPageComponent],
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
    constructor(
        private router: Router,
        private elRef: ElementRef
    ) {}

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    pushRoute(index: number) {
        this.currentPageIndex = index;
        this.router.navigate([this.pagePaths[this.currentPageIndex]])
    }

    title = 'WeddingInvZ';
    currentPageIndex = 0;
    pagePaths = ['page1', 'page2', 'page3', 'page4'];
    isScrolling = false;
    touchStartX = 0;
    touchStartTime = 0;
    touchEndX = 0;
    touchEndTime = 0;
    minSwipeDistance = 50;
    maxTapDuration = 200;
    firstInteraction = false;

    @ViewChild('musicPlayer') musicPlayer: MusicPlayerComponent = new MusicPlayerComponent;
    @ViewChild('muteButton') muteButton!: ElementRef;

    @HostListener('document:click', ['$event'])
    @HostListener('document:keydown', ['$event'])
    handleFirstInteraction(event: Event): void {
        if (!this.firstInteraction && this.musicPlayer && this.muteButton) {
            this.firstInteraction = true;
            this.muteButton.nativeElement.click();
            setTimeout(() => {
              this.musicPlayer.loadSong();
            }, 100);
          
        }
    }

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
        this.touchStartX = event.touches[0].clientX;
        this.touchStartTime = new Date().getTime();
    }

    @HostListener('window:touchend', ['$event'])
    onTouchEnd(event: TouchEvent) {
        this.touchEndX = event.changedTouches[0].clientX;
        this.touchEndTime = new Date().getTime();

        const swipeDistance = Math.abs(this.touchStartX - this.touchEndX);
        const touchDuration = this.touchEndTime - this.touchStartTime;


        if (!this.firstInteraction && swipeDistance < 5 && touchDuration < this.maxTapDuration) {
            this.handleFirstInteraction(event);
        }

        if (this.isScrolling || swipeDistance < this.minSwipeDistance || touchDuration > this.maxTapDuration) return;

        if (this.touchStartX - this.touchEndX > this.minSwipeDistance) {
            this.isScrolling = true;
            this.nextPage();
        } else if (this.touchEndX - this.touchStartX > this.minSwipeDistance) {
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

    toggleMute() {
        this.musicPlayer.toggleMute();
    }

    isMuted(): boolean {
        return this.musicPlayer.isMuted
    }
}
