import { Component } from '@angular/core';
import { transition, trigger, query, state, animate, animateChild, style, stagger } from '@angular/animations';

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
        animate('1s 0s ease-out', style({
          zIndex: 6,
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(1.5)'
        }))
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
      transition('hidden => shown', [
        style({
          transform: 'translate(-50%, -50%) scale(1)'
        }),
        animate('12s 0s linear')
      ])
    ])
  ]
})
export class HomeComponent {

  // #region Banner

    currentBanner: number = 1;
    slideLeft() {
      if (this.allowBannerChange) {
        if (this.currentBanner-- < 2) {
          this.currentBanner = 3;
        };
        this.switchBanner();
        this.setBannerTimeout()
      }
    };
    slideRight() {
      if (this.allowBannerChange) {
        if (this.currentBanner++ > 2) {
          this.currentBanner = 1;
        }
        this.switchBanner();
        this.setBannerTimeout()
      }
    };

    show1stBanner: string = 'shown';
    show2ndBanner: string = 'hidden';
    show3rdBanner: string = 'hidden';
    switchBanner() {
      switch (this.currentBanner) {
        case(1):
          this.show1stBanner = 'shown';
          this.show2ndBanner = 'hidden';
          this.show3rdBanner = 'hidden';
          break
        case(2):
          this.show1stBanner = 'hidden';
          this.show2ndBanner = 'shown';
          this.show3rdBanner = 'hidden';
          break
        case(3):
          this.show1stBanner = 'hidden';
          this.show2ndBanner = 'hidden';
          this.show3rdBanner = 'shown';
          break
      }
    };

    allowBannerChange: boolean = true;
    setBannerTimeout() {
      this.allowBannerChange = false;
      setTimeout( ()=>{this.allowBannerChange = true} , 1200)
    }

  // #endregion
}
