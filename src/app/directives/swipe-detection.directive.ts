import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';

import { ScreenPosition, ScreenDistance } from '../data-types/screen-points.classes';

/**
 * @classdesc
 *   Directive to get swipe distance on element.
 * 
 * @constructor
 *   RxJs Observers to detect swipes from mouse and touch events
 * @method ngOnInit()
 *   RxJs Observer to stop swipe detection by swipeStop Subject.
 * 
 * @param {Input: Subject<undefined>} swipeStop
 *   RxJs Subject<undefined> that can stop swipe detection.
 * @param {Output: EventEmitter<never>} swipeStart
 *   Event to emit when swipe starts.
 * @param {Output: EventEmitter<never>} swipeEnd
 *   Event to emit when swipe ends.
 * @param {Output: EventEmitter<{x: number, y: number}>} swipeMove
 *   Event to pass swipe distance.
 * 
 * @usageNotes
 * To use this swipe detection directive, apply the 'appSwipeDetection' attribute to the HTML element
 * that should detect swipe gestures.
 *
 * @example
 *   ```html
 *   <div
 *     appSwipeDetection
 *       [swipeStop]="stopSwipeSubject"
 *       (swipeStart)="handleSwipeStart()"
 *       (swipeEnd)="handleSwipeEnd()"
 *       (swipeMove)="handleSwipeMove($event)"
 *   >
 *     <!-- Swipe detection content -->
 *   </div>
 *   ```
 */
@Directive({
  selector: '[appSwipeDetection]'
})
export class SwipeDetectionDirective {

  private readonly activeMouseObservers: Subscription[] = [];
  private readonly activeTouchObservers: Subscription[] = [];
  constructor(host: ElementRef) {

    // #region Mouse events 

      const mouseDown$: Observable<MouseEvent> = fromEvent<MouseEvent>(host.nativeElement, 'mousedown');
      const mouseMove$: Observable<MouseEvent> = fromEvent<MouseEvent>(window, 'mousemove');
      const mouseUp$: Observable<Event> = fromEvent<MouseEvent>(window, 'mouseup');

      mouseDown$.subscribe( (value) =>  {
        
        this.swipeStart.emit();
        const mouseStartPosition: ScreenPosition = new ScreenPosition(value.clientX, value.clientY);
        const mouseDistance: ScreenDistance = new ScreenDistance(mouseStartPosition);
        
        this.activeMouseObservers.push(
          mouseMove$.subscribe( (value) => {
            mouseDistance.end = new ScreenPosition(value.clientX, value.clientY);
            this.swipeMove.emit(mouseDistance.distance);
          })
        );

        this.activeMouseObservers.push(
          mouseUp$.subscribe( () => {
            while (this.activeMouseObservers.length > 0) {
              this.activeMouseObservers[0].unsubscribe();
              this.activeMouseObservers.shift()
            };
            this.swipeEnd.emit();
          })
        );
        
      })

    // #endregion

    // #region Touch events

      const touchDown$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchstart');
      const touchMove$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchmove');
      const touchUp$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchend');
      const touchCancel$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchcancel');

      touchDown$.subscribe( (value) =>  {
        
        this.swipeStart.emit();
        const touchStartPosition: ScreenPosition = new ScreenPosition(value.touches[0].clientX, value.touches[0].clientY);
        const touchDistance: ScreenDistance = new ScreenDistance(touchStartPosition);

        this.activeTouchObservers.push(
          touchMove$.subscribe( (value) => {
            touchDistance.end = new ScreenPosition(value.touches[0].clientX, value.touches[0].clientY);
            this.swipeMove.emit(touchDistance.distance);
          })
        );

        this.activeTouchObservers.push(
          touchUp$.subscribe( () => {
            while (this.activeTouchObservers.length > 0) {
              this.activeTouchObservers[0].unsubscribe();
              this.activeTouchObservers.shift()
            };
            this.swipeEnd.emit();
          })
        );

        this.activeTouchObservers.push(
          touchCancel$.subscribe( () => {
            while (this.activeTouchObservers.length > 0) {
              this.activeTouchObservers[0].unsubscribe();
              this.activeTouchObservers.shift()
            };
            this.swipeEnd.emit();
          })
        );
        
      })

    // #endregion
  
  }

  ngOnInit() {
    if (this.swipeStop) {
      this.swipeStop.subscribe(() => {
        while (this.activeMouseObservers.length > 0) {
          this.activeMouseObservers[0].unsubscribe();
          this.activeMouseObservers.shift()
        };
        while (this.activeTouchObservers.length > 0) {
          this.activeTouchObservers[0].unsubscribe();
          this.activeTouchObservers.shift()
        };
        this.swipeEnd.emit();
      })    
    }
  }

  @Input() swipeStop?: Subject<undefined>;

  @Output() private readonly swipeStart = new EventEmitter<never>();
  @Output() private readonly swipeEnd = new EventEmitter<never>();
  @Output() private readonly swipeMove = new EventEmitter<{x: number, y: number}>();
}
