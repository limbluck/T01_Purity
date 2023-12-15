import { transition, state, animate, style, query, animateChild, group, sequence, trigger } from '@angular/animations';

/**
 * @classdesc Animation for the first banner section on the header page
 * 
 * @status shown - banner item shown
 * @status hidden - baner item hidden
 * 
 * @usageNotes
 *   @bannerElement - apply to a banner element
 *   @bannerContainer - apply to a banner child element, containing text of a banner
 *   @bannerBackground - apply to a banner child background img element
 * 
 * @example
 *    <element class="banner-section">
 * 
 *       <element class="banner-item" [@bannerElement]="bannerFirstItemStatus">
 *          <element class="banner-container" [@bannerContainer]="bannerFirstItemStatus">
 *             <!-- Banner text elements and buttons -->
 *          </element>
 *          <img class"banner-background" [@bannerBackground]="bannerFirstItemStatus">
 *       </element>
 * 
 *       <element class="banner-item" [@bannerElement]="bannerFirstItemStatus">
 *          <element class="banner-container" [@bannerContainer]="bannerFirstItemStatus">
 *             <!-- Banner text elements and buttons -->
 *          </element>
 *          <img class"banner-background" [@bannerBackground]="bannerFirstItemStatus">
 *       </element>
 * 
 *       <element class="banner-item" [@bannerElement]="bannerFirstItemStatus">
 *          <element class="banner-container" [@bannerContainer]="bannerFirstItemStatus">
 *             <!-- Banner text elements and buttons -->
 *          </element>
 *          <img class"banner-background" [@bannerBackground]="bannerFirstItemStatus">
 *       </element>
 * 
 *    </element>
 */
export const bannerAnimations = {
  bannerElementAnimation: trigger('bannerElement', [
    state('hidden', style({
      transform: 'translate(-50%, -50%) scale(1.5)',
      opacity: 0
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
        sequence([
          animate('1s 0s ease-out', style({
            zIndex: 6,
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(1.5)'
          })),
          style({
            zIndex: 0
          })
        ]),
        query('@bannerContainer', animateChild()),
        query('@bannerBackground', animateChild())
      ]),
    ])
  ]),
  bannerContainerAnimation: trigger('bannerContainer', [
    transition('hidden => shown', [
      style({
        opacity: 0,
        transform: 'translate(-50%, -35%)'
      }),
      animate('200ms 1s ease-out')
    ]),
    transition('shown => hidden', [
      animate('200ms 1s ease-out')
    ])
  ]),
  bannerBackgroundAnimation: trigger('bannerBackground', [
    state('void', style({
      transform:  'translate(-50%, -50%) scale(1)'
    })),
    state('hidden', style({
      transform: 'translate(-50%, -50%) scale(1)'
    })),
    state('shown', style({
      transform: 'translate(-50%, -50%) scale(1.2)'
    })),
    transition('* => *', [
      animate('12s 0s linear')
    ])
  ])
}
  