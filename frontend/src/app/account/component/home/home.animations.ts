import { trigger, state, style, transition, animate, keyframes, stagger, query, group, animateChild } from '@angular/animations';

export const Animations = {

    moveInLeft: trigger('showRightIcon', [
        state('hide', style({
          transform: 'translateX(100%)',
          opacity: '0',
        })),
        state('display', style({
          transform: 'translateX(0%)',
          opacity: '1',
        })),
        transition('hide => display', [
          animate('1s .5s')
        ])
      ]),

    moveInRight: trigger('showLeftIcon', [
        state('hide', style({
          transform: 'translateX(-100%)',
          opacity: '0',
        })),
        state('display', style({
          transform: 'translateX(0)',
          opacity: '1'
        })),
        transition('hide => display', [
          animate('1s .5s')
        ])
    ]),

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
