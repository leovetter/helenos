import { trigger, state, style, transition, animate, keyframes, stagger, query, group, animateChild } from '@angular/animations';

export const Animations = {

  reduceNavbar: trigger('reduceNavbar', [
    state('full', style({
      height: '90vh'
      })),
    state('small', style({
      height: '{{defHeight}}',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      }), {params: {defHeight: 0}}),
      transition('full => small', 
      group([
        query('@fadeOut', [
          animateChild()
        ], {optional: true}),
      animate('4s'), query('@reduceHeader', [
        animateChild()
      ], {optional: true}),
    animate('4s')
    ])),
    transition('small => full', 
      group([
        query('@fadeOut', [
          animateChild()
        ], {optional: true}),  
      animate('4s'), query('@reduceHeader', [
        animateChild()
      ], {optional: true}),
    animate('4s')
    ])),
  ]),

  reduceHeader: trigger('reduceHeader', [
    state('full', style({
      height: '88vh'
      })),
    state('small', style({
      height: '{{defHeight}}',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      }), {params: {defHeight: 0}}),
      transition('small => full', [animate('4s')]),
      transition('full => small', [animate('4s')]),
  ]),

  fadeOut: trigger('fadeOut', [
    state('visible', style({
      opacity: 1
      })),
    state('hide', style({
      opacity: 0
      })),
      transition('visible => hide', [animate('4s')]),
      transition('hide => visible', [animate('4s')]),
  ]),

  shakeHelenosText: trigger('shakeHelenosText', [
    state('start', style({
        transform: 'translateX(10rem)'
      })),
    state('final', style({
        transform: 'translateX(0)'
      })),
      transition('start => final', [
        animate('2s 0s ease-out', keyframes([
            style({ transform: 'translateX(-1rem)', offset: 0.8 }),
            style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
  ]),

  shakeHeading: trigger('shakeHeading', [
      state('start', style({
          transform: 'translateX(-10rem)'
        })),
      state('final', style({
          transform: 'translateX(0)'
        })),
        transition('start => final', [
          animate('2s 0s ease-out', keyframes([
              style({ transform: 'translateX(1rem)', offset: 0.8 }),
              style({ transform: 'translateX(0)', offset: 1 })
          ]))
        ])
  ]),

  closeNavigationButton: trigger('closeNavigationButton', [
    state('close', style({
        width: 0,
        height: 0
    })),
    state('open', style({
      position: 'absolute',
      right: '1.5rem',
      top: '1.5rem',
      width: '5rem',
      height: '5rem'
    })),
    transition('open => close', [
      group([
        query('@closeNavigationIcon', animateChild()),
        animate('1s')
      ])
    ]),
    transition('close => open', [
      group([
        query('@closeNavigationIcon', animateChild()),
        animate('1s')
      ])
    ]),
  ]),

  closeNavigationIcon: trigger('closeNavigationIcon', [
    state('close', style({
        transform: 'scale(0)',
        display: 'none'
    })),
    state('open', style({
      transform: 'scale(1)',
      position: 'relative',
      marginTop: '2.5rem'
  })),
    transition('open  => close', animate('1s', keyframes([
      style({ transform: 'scale(0)', marginTop: '1.4rem', offset: .6}),
    ]))),
    transition('close  => open', animate('1s', keyframes([
      style({ transform: 'scale(0)', marginTop: '1.4rem', offset: .4}),
      style({ transform: 'scale(1)', marginTop: '2.5rem', offset: 1}),
    ])))
  ]),

  openNavigationMenu: trigger('openNavigationMenu', [
    state('close', style({
        width: 0,
        height: 0,
        opacity: 0
    })),
    transition('close => open', [animate('1s')]),
    transition('open => close', [animate('1s')])
  ]),

  openMenuLinks: trigger('openMenuLinks', [
    state('close', style({
        opacity: 0,
        display: 'none'
    })),
    state('open', style({
      opacity: 1,
  })),
    transition('close  => open', animate('2s', keyframes([
      style({ opacity: 0, display: 'none', offset: 0.9})
    ])))
  ]),

  showOpenIcon: trigger('showOpenIcon', [
    state('close', style({
        opacity: 0
    })),
    state('open', style({
      opacity: 1
  })),
    transition('close  => open', animate('2s', keyframes([
      style({ opacity: 0, offset: 0.99})
    ]))),
  ]),

  showHidePlayer: trigger('showHidePlayer', [
    state('show', style({
      transform: 'scale(1)',
    })),
    state('hide', style({
      transform: 'scale(0)',
    })),
    transition('show => hide', [
        animate('2s')
    ])
  ]),
}
