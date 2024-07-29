import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
    selector: 'second-page',
    standalone: true,
    templateUrl: './second-page.component.html',
    styleUrls: ['second-page.component.less', '../app.component.less'],
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
export class SecondPageComponent {
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