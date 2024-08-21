import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
    selector: 'fourth-page',
    standalone: true,
    templateUrl: './fourth-page.component.html',
    styleUrls: ['fourth-page.component.less', '../app.component.less'],
    imports: [CommonModule],
    animations: [
        trigger('border', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })), 
            transition('void <=> visible', [
              style({ opacity: 0 }),
              animate('0.5s ease-in-out', style({ opacity: 1 }))
            ])
        ]),
        trigger('tree', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })), 
            transition('void <=> visible', [
              style({ opacity: 0 }),
              animate('0.5s ease-in-out', style({ opacity: 1 }))
            ])
        ]),
        trigger('fish', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })), 
            transition('void <=> visible', [
              style({ opacity: 0 }),
              animate('0.5s ease-in-out', style({ opacity: 1 }))
            ])
        ]),
        trigger('content', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })), 
            transition('void <=> visible', [
              style({ opacity: 0 }),
              animate('0.5s ease-in-out', style({ opacity: 1 }))
            ])
        ]),
        trigger('progressBar', [
            state('start', style({
                width: '0%'
            })),
            state('end', style({
                width: '{{progress}}%'
            }), {
                params: { progress: 0 }
            }), 
            transition('start <=> end', animate('1s linear'))
        ])
    ]
})
export class FourthPageComponent implements OnInit, OnDestroy, AfterViewInit{
    targetDate: Date = new Date('2024-11-1');
    startDate: Date = new Date('2024-1-1');
    days: number = 0;
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    progress: number = 0;
    progressState: string = 'start';
    showBorder = false;
    showContent = false;
    showTree = false;
    showFish =  false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
        this.showBorder = true;
        this.updateCountdown();
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            setInterval(() => {
                this.updateCountdown();
            }, 1000);
        }
    }

    ngOnDestroy(): void {
        this.showBorder = false;
        this.showTree = false;
        this.showFish = false;
        this.showContent = false;
        this.progress = this.days = this.hours = this.minutes = this.seconds = 0;
    }

    onBorderDone(event: any) {
        if (event.toState === 'visible') {
            this.showTree = true;
        }
    }

    onTreeDone(event: any) {
        if (event.toState === 'visible') {
            this.showFish = true;
        }
    }

    onFishDone(event: any) {
        if (event.toState === 'visible') {
            this.showContent = true;
        }
    }

    updateCountdown() {
        const now = new Date();
        const timeDiff = this.targetDate.getTime() - now.getTime();

        if (timeDiff > 0) {
            this.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            const totalTime = this.targetDate.getTime() - this.startDate.getTime();
            this.progress = ((totalTime - timeDiff) / totalTime) * 100;
            this.progressState = 'end';
        } else {
            this.days = this.hours = this.minutes = this.seconds = 0;
            this.progress = 100;
        }
    }
}