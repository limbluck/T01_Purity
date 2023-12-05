import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';

import { ScreenPosition, ScreenDistance } from '../data-types/screen-points.classes';

@Directive({
  selector: '[appSwipeDetection]'
})
export class SwipeDetectionDirective {
  
  @Input()
  swipeStop!: Subject<undefined>;

  @Output() private readonly swipeStart = new EventEmitter<never>();
  @Output() private readonly swipeEnd = new EventEmitter<never>();
  @Output() private readonly swipeMove = new EventEmitter<{x: number, y: number}>();

  private readonly activeMouseObservers: Subscription[] = [];
  private readonly activeTouchObservers: Subscription[] = [];
  
  constructor(host: ElementRef) {

    // #region Mouse events 

      const mouseDown$: Observable<MouseEvent> = fromEvent(host.nativeElement, 'mousedown');
      const mouseMove$: Observable<MouseEvent> = fromEvent(host.nativeElement, 'mousemove');
      const mouseUp$: Observable<MouseEvent> = fromEvent(host.nativeElement, 'mouseup');

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
