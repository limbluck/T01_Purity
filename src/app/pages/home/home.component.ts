import { Component } from '@angular/core';
import { transition, trigger, state, animate, style, query, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('changeBanner', [
      state('hidden', style({
        transform: 'translate(-50%, -50%) scale(1.5)'
      })),
      state('shown', style({
        zIndex: 5,
        transform: 'translate(-50%, -50%) scale(1)'
      })),
      transition('shown => hidden', [
        style({
          zIndex: 6
        }),
        group([
          query('@*', animateChild()),
          animate('1s 0s ease-out', style({
            zIndex: 6,
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(1.5)'
          }))
        ])
      ])
    ]),
    trigger('showBannerContainer', [
      transition('hidden => shown', [
        style({
          opacity: 0,
          transform: 'translate(-50%, -35%)'
        }),
        animate('200ms 1s ease-out')
      ])
    ]),
    trigger('scaleBannerBackground', [
      state('void', style({
        transform:  'translate(-50%, -50%) scale(1)'
      })),
      state('hidden', style({
        transform: 'translate(-50%, -50%) scale(1)'
      })),
      state('shown', style({
        transform: 'translate(-50%, -50%) scale(1.2)'
      })),
      transition('void => *', [
        animate('12s 0s linear')
      ]),
      transition('hidden => shown', [
        animate('12s 0s linear')
      ]),
      transition('shown => hidden', [
        animate('12s 0s linear')
      ])
    ])
  ]
})
export class HomeComponent {

  // #region Banner

    bannerCurrent: number = 1;
    bannerChange(side: string) {
      if (this.bannerAllowChange) {
        switch (side) {
          case ('left'):
            if (this.bannerCurrent-- < 2) {
              this.bannerCurrent = 3;
            };
            break
          case ('right'):
            if (this.bannerCurrent++ > 2) {
              this.bannerCurrent = 1;
            };
            break
          default:
            throw new Error("Unexpected value of 'side' variable in bannerChange() function")
        };
        this.bannerSwitch();
        this.bannerTimeout()
      }
    }

    banner1stItem: string = 'shown';
    banner2ndItem: string = 'hidden';
    banner3rdItem: string = 'hidden';
    bannerSwitch() {
      switch (this.bannerCurrent) {
        case(1):
          this.banner1stItem = 'shown';
          this.banner2ndItem = 'hidden';
          this.banner3rdItem = 'hidden';
          break
        case(2):
          this.banner1stItem = 'hidden';
          this.banner2ndItem = 'shown';
          this.banner3rdItem = 'hidden';
          break
        case(3):
          this.banner1stItem = 'hidden';
          this.banner2ndItem = 'hidden';
          this.banner3rdItem = 'shown';
          break
        default:
          throw new Error("Unexpected value of 'this.bannerCurrent' in bannerSwitch() function")
      }
    }

    bannerAllowChange: boolean = true;
    bannerTimeout() {
      this.bannerAllowChange = false;
      setTimeout( ()=>{this.bannerAllowChange = true} , 1200)
    }

  // #endregion
  
}
