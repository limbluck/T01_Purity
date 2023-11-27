import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, fromEvent } from "rxjs";

@Directive({
  selector: '[appHorizontalSwipe]'
})
export class HorizontalSwipeDirective {

  @Output() swipeDirection = new EventEmitter<string>();

  constructor (host: ElementRef) {

    // #region Mouse events 

    let mouseDown$: Observable<MouseEvent> = fromEvent(host.nativeElement, 'mousedown');
    let mouseMove$: Observable<MouseEvent> = fromEvent(host.nativeElement, 'mousemove');
    let mouseUp$: Observable<MouseEvent> = fromEvent(host.nativeElement, 'mouseup');
    let activeMouseObservers: Subscription[] = [];

    mouseDown$.subscribe( (value) =>  {

      let mouseStartPositionX: number = value.clientX;

      activeMouseObservers.push(
        mouseMove$.subscribe( (value) => {
          
          console.log('dsa');

          if (mouseStartPositionX - value.clientX > 150) {
            this.swipeDirection.emit('right');
            while (activeMouseObservers.length > 0) {
              activeMouseObservers[0].unsubscribe();
              activeMouseObservers.shift()
            }
          }
          else if (mouseStartPositionX - value.clientX < -150) {
            this.swipeDirection.emit('left');
            while (activeMouseObservers.length > 0) {
              activeMouseObservers[0].unsubscribe();
              activeMouseObservers.shift()
            }
          }

        })
      );

      activeMouseObservers.push(
        mouseUp$.subscribe( () => {
          while (activeMouseObservers.length > 0) {
            activeMouseObservers[0].unsubscribe();
            activeMouseObservers.shift()
          }
        })
      );
      
    })

    // #endregion

    // #region Touch events

    let touchDown$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchstart');
    let touchMove$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchmove');
    let touchUp$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchend');
    let touchCancel$: Observable<TouchEvent> = fromEvent(host.nativeElement, 'touchcancel');
    let activeTouchObservers: Subscription[] = [];

    touchDown$.subscribe( (value) =>  {
      
      let touchStartPositionX: number = value.touches[0].clientX;

      activeTouchObservers.push(
        touchMove$.subscribe( (value) => {
          if (touchStartPositionX - value.touches[0].clientX > 150) {
            this.swipeDirection.emit('right');
            while (activeTouchObservers.length > 0) {
              activeTouchObservers[0].unsubscribe();
              activeTouchObservers.shift()
            }
          }
          else if (touchStartPositionX - value.touches[0].clientX < -150) {
            this.swipeDirection.emit('left');
            while (activeTouchObservers.length > 0) {
              activeTouchObservers[0].unsubscribe();
              activeTouchObservers.shift()
            }
          }
        })
      );

      activeTouchObservers.push(
        touchUp$.subscribe( () => {
          while (activeTouchObservers.length > 0) {
            activeTouchObservers[0].unsubscribe();
            activeTouchObservers.shift()
          }
        })
      );

      activeTouchObservers.push(
        touchCancel$.subscribe( () => {
          while (activeTouchObservers.length > 0) {
            activeTouchObservers[0].unsubscribe();
            activeTouchObservers.shift()
          }
        })
      );
      
    })

    // #endregion

  }
}
