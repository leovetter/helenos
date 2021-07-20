import { animate, state, style, transition, trigger } from '@angular/animations';

export const Animations = {

    openInput: trigger('openInput', [
        state('show', style({
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        })),
        state('hide', style({
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        })),
        transition('hide => show', [
            animate('2s')
        ])
      ]),

    openLastNameInput: trigger('openLastNameInput', [
      state('show', style({
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      })),
      state('hide', style({
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
      })),
      transition('hide => show', [
          animate('2s')
      ])
    ]),
}
