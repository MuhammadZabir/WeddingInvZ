import { animate, state, style, transition, trigger } from "@angular/animations";
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
        trigger('image', [
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
        ])
    ]
})
export class FirstPageComponent implements OnInit, OnDestroy {
    showBorder = false;
    showTree = false;
    showContent = false;
    showImage = false;
    showBeforeContent = false;
    firstTime = true;

    ngOnInit(): void {
        this.showBorder = true;
    }

    ngOnDestroy(): void {
        this.showBorder = false;
        this.showTree = false;
        this.showContent = false;
        this.showImage = false;
        this.showBeforeContent = false;
    }

    onBorderDone(event: any) {
        if (event.toState === 'visible') {
            this.showTree = true;
        }
    }

    onTreeDone(event: any) {
        if (event.toState === 'visible') {
            this.showContent = true;
        }
    }

    onContentDone(event: any) {
        if (event.toState === 'visible') {
            this.showImage = true;
        }
    }
}