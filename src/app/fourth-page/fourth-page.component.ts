import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'fourth-page',
    standalone: true,
    templateUrl: './fourth-page.component.html',
    styleUrls: ['fourth-page.component.less', '../app.component.less'],
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
export class FourthPageComponent implements OnInit, OnDestroy {
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