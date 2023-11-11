import { trigger, state, transition, style, animate} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('bannerWrapperChange', 
      [
        state('hide',
            style({
              opacity: 0
            })
          ),
          state('show',
            style({
              zIndex: 1
            })
          ),
        transition('show => hide',
          [
            style({
              zIndex: 2
            }),
            animate('1s ease-out',
              style({
                opacity: 0,
                transform: 'scale(2)'
              })
            )
          ]
        )
      ]
    ),

    trigger('bannerContainerChange', 
      [
        state('hide',
          style({
            opacity: 0,
            transform: 'translate(-50%, -25%)'
          })
        ),
        state('show',
          style({
            opacity: 1,
            transform: 'translate(-50%, -50%)'
          })
        ),
      transition('void => show',
        [
          style({
            opacity: 0,
            transform: 'translate(-50%, -50%)'
          }),
          animate('300ms ease-out')
        ]
      ),
      transition('hide => show',
        [
          style({

          }),
          animate('1s ease-out',
            style({})
          ),
          animate('300ms ease-out')
        ]
      ),
      transition('show => hide',
        [
          animate('1s ease-out')
        ]
      )
    ]),
    
    trigger('bannerContainerChange3of10', 
    [
      state('hide',
        style({
          opacity: 0,
          transform: 'translate(-80%, -50%)'
        })
      ),
      state('show',
        style({
          opacity: 1,
          transform: 'translate(-70%, -50%)'
        })
      ),
    transition('void => show',
      [
        style({
          opacity: 0,
          transform: 'translate(-80%, -50%)'
        }),
        animate('1s ease-out',
          style({})
        ),
        animate('300ms ease-out')
      ]
    ),
    transition('hide => show',
      [
        style({

        }),
        animate('1s ease-out',
          style({})
        ),
        animate('300ms ease-out')
      ]
    ),
    transition('show => hide',
      [
        animate('1s ease-out')
      ]
    )
  ]),

    trigger('bannerBackgroundChange',
      [
        state('hide',
          style({
            transform: 'translate(50%, 50%) scale(1.2)'
          })
        ),
        state('show',
          style({
            transform: 'translate(50%, 50%) scale(1.2)'
          })
        ),
        transition('void => show',
          [
            style({
              transform: 'translate(50%, 50%) scale(1)'
            }),
            animate('1s ease-out',
              style({
                transform: 'translate(50%, 50%) scale(1.2)'
              })
            )
          ]
        ),
        transition('hide => show',
          [
            style({
              transform: 'translate(50%, 50%) scale(1)'
            }),
            animate('1s ease-out',
              style({
                transform: 'translate(50%, 50%) scale(1.2)'
              })
            )
          ]
        )
      ]
    )
  ]
})
export class HomeComponent {

}
