import { AnimationEvent, animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'first-page',
    standalone: true,
    templateUrl: './first-page.component.html',
    styleUrls: ['first-page.component.less', '../app.component.less'],
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
        trigger('content', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })), 
            transition('hidden <=> visible', [
              style({ opacity: 0 }),
              animate('0.5s ease-in-out', style({ opacity: 1 }))
            ])
        ])
    ]
})
export class FirstPageComponent implements OnInit, OnDestroy {
    showBorder = false
    showContent = false;

    ngOnInit(): void {
        this.showBorder = true;
    }

    ngOnDestroy(): void {
        this.showBorder = false;
        this.showContent = false;
    }

    onBorderDone() {
        this.showContent = true;
    }
}