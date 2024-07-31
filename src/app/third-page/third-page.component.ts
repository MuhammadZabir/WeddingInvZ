import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
    selector: 'third-page',
    standalone: true,
    templateUrl: './third-page.component.html',
    styleUrls: ['third-page.component.less', '../app.component.less'],
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
export class ThirdPageComponent {
    showBorder = false
    showContent = false;

    ngOnInit(): void {
        this.showBorder = true;
    }

    ngOnDestroy(): void {
        this.showBorder = false;
        this.showContent = false;
    }

    onBorderDone(event: any) {
        if (event.toState === 'visible') {
            this.showContent = true;
        }
    }
}