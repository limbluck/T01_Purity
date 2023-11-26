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
          
          if (mouseStartPositionX - value.clientX > 150) {
            this.swipeDirection.emit('right');
            for (let i = activeMouseObservers.length - 1; i > -1; i--) {
              activeMouseObservers[i].unsubscribe();
              activeMouseObservers.pop()
            }
          }
          else if (mouseStartPositionX - value.clientX < -150) {
            this.swipeDirection.emit('left');
            for (let i = activeMouseObservers.length - 1; i > -1; i--) {
              activeMouseObservers[i].unsubscribe();
              activeMouseObservers.pop()
            }
          }

        })
      );

      activeMouseObservers.push(
        mouseUp$.subscribe( () => {
          
          for (let i = activeMouseObservers.length - 1; i > -1; i--) {
            activeMouseObservers[i].unsubscribe();
            activeMouseObservers.pop()
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
            for (let i = activeTouchObservers.length - 1; i > -1; i--) {
              activeTouchObservers[i].unsubscribe();
              activeTouchObservers.pop()
            }
          }
          else if (touchStartPositionX - value.touches[0].clientX < -150) {
            this.swipeDirection.emit('left');
            for (let i = activeTouchObservers.length - 1; i > -1; i--) {
              activeTouchObservers[i].unsubscribe();
              activeTouchObservers.pop()
            }
          }
        })
      );

      activeTouchObservers.push(
        touchUp$.subscribe( () => {
          for (let i = activeTouchObservers.length - 1; i > -1; i--) {
            activeTouchObservers[i].unsubscribe();
            activeTouchObservers.pop()
          }
        })
      );

      activeTouchObservers.push(
        touchCancel$.subscribe( () => {
          for (let i = activeTouchObservers.length - 1; i > -1; i--) {
            activeTouchObservers[i].unsubscribe();
            activeTouchObservers.pop()
          }
        })
      );
      
    })

    // #endregion

  }
}
