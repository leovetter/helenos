import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {

    scaleOut: trigger('scaleOut', [
        state('leave', style({
            background: 'transparent'
        })),
        state('hover', style({
            background: '#A5ACB1'
        })),
        transition('start => final', [
            animate('0s')
        ])
    ]),
}
