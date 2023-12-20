import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, inject } from '@angular/core';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
import { Observable, fromEvent } from "rxjs";

/**
 * @classdesc
 *   Directive for creating responsive carousels in flex containers.
 * 
 * @requires gap property setted in container.
 * 
 * @constructor
 *   Inject necessary services
 * @method ngOnInit()
 *   Get and set width properties: by onInit() AND by Observer(window resize)
 * 
 * @Input carouselSetPage: number
 *   Set the current page of the carousel.
 * @Output carouselCurrentPage: EventEmitter<number>
 *   Event to output the current page number.
 * @Input carouselSwipeDistance: number
 *   Set the swipe distance to handle carousel navigation.
 * @Input carouselSwipeActive: boolean
 *   Set the swipe status to handle swipe end.
 * 
 * @usageNotes
 *   To use this carousel directive, apply the 'appCarousel' attribute to the HTML element that should act as the carousel container.
 *   Container must be a flex with a gap proprety!
 * 
 * @example
 * ```html
 * <div style="display: flex; gap: 0"
 *   appCarousel
 *   [carouselSetPage]="currentPage"
 *   (carouselCurrentPage)="currentPageRespond"
 *   [carouselSwipeDistance]="swipeDistance"
 *   [carouselSwipeActive]="swipeActive"
 * >
 *   <!-- Carousel children goes here -->
 * </div>
 * ```
 */
@Directive({
  selector: '[appCarousel]'
})
export class CarouselDirective {

  constructor(
    private readonly host: ElementRef,
    private readonly animationBuilder: AnimationBuilder,
    private readonly renderer: Renderer2
  ) {}

  private elementChildrenWidth!: number;
  private elementGap!: number;
  private elementChildrenFit!: number;
  ngOnInit() {

    // Get width properties
    this.elementChildrenWidth = parseInt(getComputedStyle(this.host.nativeElement.children[0]).width.slice(0, -2));
    this.elementGap = parseInt(getComputedStyle(this.host.nativeElement).gap.slice(0, -2));
    this.elementChildrenFit = Math.floor(parseInt(getComputedStyle(this.host.nativeElement.parentElement!).width.slice(0, -2)) / this.elementChildrenWidth);

    // Set initial display properties (and display the exact amount of children to fit the screen)
    for (let i = 0; i < this.host.nativeElement.children.length; i++) {
      this.renderer.setStyle(this.host.nativeElement.children[i], 'display', 'none')
    }
    this.renderer.removeStyle(this.host.nativeElement.children[this.host.nativeElement.children.length - 1], 'display');
    this.renderer.setStyle(this.host.nativeElement.children[this.host.nativeElement.children.length - 1], 'order', -1)
    for (let i = 0; i < this.elementChildrenFit + 1; i++) {
      this.renderer.removeStyle(this.host.nativeElement.children[i], 'display')
    }

    // Observer to get and set width properties on window resize
    const windowResize$: Observable<Event> = fromEvent(window, 'resize');
    windowResize$.subscribe(() => {
      this.elementChildrenWidth = parseInt(getComputedStyle(this.host.nativeElement.children[0]).width.slice(0, -2));
      this.elementGap = parseInt(getComputedStyle(this.host.nativeElement).gap.slice(0, -2));
      this.elementChildrenFit = Math.floor(parseInt(getComputedStyle(this.host.nativeElement.parentElement).width.slice(0, -2)) / this.elementChildrenWidth);

      for (let i = 0; i < this.host.nativeElement.children.length; i++) {
        this.renderer.setStyle(this.host.nativeElement.children[i], 'display', 'none')
      }
      this.renderer.removeStyle(this.host.nativeElement.children[this.host.nativeElement.children.length - 1], 'display');
      this.renderer.setStyle(this.host.nativeElement.children[this.host.nativeElement.children.length - 1], 'order', -1)
      for (let i = 0; i < this.elementChildrenFit + 1; i++) {
        this.renderer.removeStyle(this.host.nativeElement.children[i], 'display')
      }
    });
  }

/**
 * Input property to set the current page of the carousel.
 * Emits the current page through the 'carouselCurrentPage' output event.
 * @property carouselSetPage
 * @param {number} setPage - The target page number.
 */
  private currentPage: number = 1;
  @Input()
  set carouselSetPage(setPage: number) {

    // Loop page numbers
    if (setPage < 1) {setPage = this.host.nativeElement.children.length}
    if (setPage > this.host.nativeElement.children.length) {setPage = 1}

    // Send current page to parent component
    this.carouselCurrentPage.emit(setPage);

    // Calculate number of pages between a current page and a target page
    let pagesBetween: number;
    if (setPage > this.currentPage) {
      pagesBetween = Math.abs(setPage - this.currentPage) > (this.host.nativeElement.children.length / 2)
        ? setPage - this.currentPage - this.host.nativeElement.children.length
        : setPage - this.currentPage
    } else {
      pagesBetween = Math.abs(setPage - this.currentPage) > (this.host.nativeElement.children.length / 2)
        ? setPage - this.currentPage + this.host.nativeElement.children.length
        : setPage - this.currentPage
    }

    // Animate transitions for a current page, all pages between and a target page
      // The check to prevent an initial call
    if (pagesBetween) {changePage(this, this.currentPage, pagesBetween)}

    // The function required for self-invoking
    function changePage(host: CarouselDirective, currentPage: number, iterationsTotal: number, iterationCurrent: number = 0) {
      const animation: AnimationPlayer = host.animationBuilder
      .build([
        style({transform: '*'}),
        animate(`${300 / Math.abs(iterationsTotal)}ms linear`,
          style({transform: `translate(calc(-50% + ${(host.elementChildrenWidth + host.elementGap) * Math.sign(-pagesBetween)}px))`})
        ),
        style({transform: 'translate(-50%)'})
      ])
      .create(host.host.nativeElement);
      animation.onDone(() => {
        // Hide all children
          for (let i = 0; i < host.host.nativeElement.children.length; i++) {
            host.renderer.setStyle(host.host.nativeElement.children[i], 'display', 'none')
            host.renderer.setStyle(host.host.nativeElement.children[i], 'order', 0)
          }

        // Loop page numbers
          currentPage = currentPage + Math.sign(iterationsTotal);
          if (currentPage < 1) {currentPage = host.host.nativeElement.children.length}
          if (currentPage > host.host.nativeElement.children.length) {currentPage = 1}

        // Show children for current page
          let j = host.host.nativeElement.children[currentPage - 2] // Index in children array
            ? currentPage - 2
            : host.host.nativeElement.children.length - 1; // Loop in children array
          for (let i = 0; i < host.elementChildrenFit + 2; i++) {
            host.renderer.removeStyle(host.host.nativeElement.children[j], 'display');
            host.renderer.setStyle(host.host.nativeElement.children[j], 'order', i);
            if (++j >= host.host.nativeElement.children.length) {j = 0} // Loop in children array
          }

        // Call the animation for a next page between a current and a target ones
          if (++iterationCurrent < Math.abs(iterationsTotal)) {changePage(host, currentPage, iterationsTotal, iterationCurrent)}

        // Destroy the animation to unlock property changes
          animation.destroy()
      });
      // Initial play for the animation
      animation.play();
    }

    // Set current page for next calls
      this.currentPage = setPage;
  }

  @Output() carouselCurrentPage: EventEmitter<number> = new EventEmitter<number>();
  
/**
 * Input property to set the swipe distance and handle carousel navigation accordingly.
 * @property carouselSwipeDistance
 * @param {number} swipeDistance - The distance of the swipe gesture.
 */
  private swipeDistance = 0;
  private swipeCompensation = 0;
  @Input()
  set carouselSwipeDistance(swipeDistance: number) {
    this.swipeDistance = swipeDistance;

    // A check for page change (--left)
    if (this.swipeDistance > this.elementChildrenWidth + this.elementGap + this.swipeCompensation) {

      // Compensation of the swipe distance number to set a propper translate value 
      this.swipeCompensation = this.elementChildrenWidth + this.elementGap + this.swipeCompensation;

      // Loop page numbers
      this.currentPage--;
      if (this.currentPage < 1) {this.currentPage = this.host.nativeElement.children.length}

      // Change page
        // Hide all children
        for (let i = 0; i < this.host.nativeElement.children.length; i++) {
          this.renderer.setStyle(this.host.nativeElement.children[i], 'display', 'none')
          this.renderer.setStyle(this.host.nativeElement.children[i], 'order', 0)
        }
        // Show children for current page
        let j = this.host.nativeElement.children[this.currentPage - 2] // Index in children array
          ? this.currentPage - 2
          : this.host.nativeElement.children.length - 1; // Loop in children array
        for (let i = 0; i < this.elementChildrenFit + 2; i++) {
          this.renderer.removeStyle(this.host.nativeElement.children[j], 'display');
          this.renderer.setStyle(this.host.nativeElement.children[j], 'order', i);
          if (++j >= this.host.nativeElement.children.length) {j = 0} // Loop in children array
        }

      // Send current page to parent component
      this.carouselCurrentPage.emit(this.currentPage);
      
    // A check for page change (++right)
    } else if (this.swipeDistance < - this.elementChildrenWidth - this.elementGap + this.swipeCompensation) {

      // Compensation of the swipe distance number to set a propper translate value 
      this.swipeCompensation = - this.elementChildrenWidth - this.elementGap + this.swipeCompensation;
      
      // Loop page numbers
      this.currentPage++;
      if (this.currentPage > this.host.nativeElement.children.length) {this.currentPage = 1}

      // Change page
        // Hide all children
        for (let i = 0; i < this.host.nativeElement.children.length; i++) {
          this.renderer.setStyle(this.host.nativeElement.children[i], 'display', 'none')
          this.renderer.setStyle(this.host.nativeElement.children[i], 'order', 0)
        }
        // Show children for current page
        let j = this.host.nativeElement.children[this.currentPage - 2]
          ? this.currentPage - 2
          : this.host.nativeElement.children.length - 1;
        for (let i = 0; i < this.elementChildrenFit + 2; i++) {
          this.renderer.removeStyle(this.host.nativeElement.children[j], 'display');
          this.renderer.setStyle(this.host.nativeElement.children[j], 'order', i);
          if (++j >= this.host.nativeElement.children.length) {j = 0}
        }

      // Send current page to parent component
        this.carouselCurrentPage.emit(this.currentPage);
    }

    // Set translate property according to swipde distance
    this.renderer.setStyle(
      this.host.nativeElement,
      'transform',
      `translate(calc(-50% + ${this.swipeDistance - this.swipeCompensation}px))`
    );
  }

/**
 * Set the swipe status to handle swipe end.
 * @property carouselSwipeActive
 * @param {boolean} swipeActive - Indicate whether the carousel is currently in a swiping state with a boolean value.
 */
  @Input()
  set carouselSwipeActive(swipeActive: boolean) {
    if (!swipeActive) {

      // If scrolled more than a half of a child element (--left)
      if ((- (this.swipeDistance % (this.elementChildrenWidth + this.elementGap)) / (this.elementChildrenWidth + this.elementGap)) < -0.5) {

        // Loop page numbers
        this.currentPage--;
        if (this.currentPage < 1) {this.currentPage = this.host.nativeElement.children.length}

        // Send current page to parent component
        this.carouselCurrentPage.emit(this.currentPage);
  
        // Change page
          // Hide all children
          for (let i = 0; i < this.host.nativeElement.children.length; i++) {
            this.renderer.setStyle(this.host.nativeElement.children[i], 'display', 'none')
            this.renderer.setStyle(this.host.nativeElement.children[i], 'order', 0)
          }
          // Show children for current page
          let j = this.host.nativeElement.children[this.currentPage - 2]
            ? this.currentPage - 2
            : this.host.nativeElement.children.length - 1;
          for (let i = 0; i < this.elementChildrenFit + 2; i++) {
            this.renderer.removeStyle(this.host.nativeElement.children[j], 'display');
            this.renderer.setStyle(this.host.nativeElement.children[j], 'order', i);
            if (++j >= this.host.nativeElement.children.length) {j = 0}
          }
  
        // Animate transition to --left page
          const animation: AnimationPlayer = this.animationBuilder
          .build([
            style({transform: `translate(calc(-50% + ${-((this.elementChildrenWidth + this.elementGap) - (this.swipeDistance - this.swipeCompensation))}px))`}),
            animate(`150ms ease`,
              style({transform: `translate(-50%)`})
            ),
            style({transform: '*'}),
          ])
          .create(this.host.nativeElement);
          animation.onDone( () => {
          this.renderer.setStyle(
            this.host.nativeElement,
            'transform',
            `translate(-50%)`
          ),
          animation.destroy()
          })
          animation.play();

        

      // If scrolled more than a half of a child element (++right)
      } else if ((- (this.swipeDistance % (this.elementChildrenWidth + this.elementGap)) / (this.elementChildrenWidth + this.elementGap)) > 0.5) {
        
        // Loop page numbers
        this.currentPage++;
        if (this.currentPage > this.host.nativeElement.children.length) {this.currentPage = 1}

        // Send current page to parent component
        this.carouselCurrentPage.emit(this.currentPage);

        // Change page
          // Hide all children
          for (let i = 0; i < this.host.nativeElement.children.length; i++) {
            this.renderer.setStyle(this.host.nativeElement.children[i], 'display', 'none')
            this.renderer.setStyle(this.host.nativeElement.children[i], 'order', 0)
          }
          // Show children for current page
          let j = this.host.nativeElement.children[this.currentPage - 2]
            ? this.currentPage - 2
            : this.host.nativeElement.children.length - 1;
          for (let i = 0; i < this.elementChildrenFit + 2; i++) {
            this.renderer.removeStyle(this.host.nativeElement.children[j], 'display');
            this.renderer.setStyle(this.host.nativeElement.children[j], 'order', i);
            if (++j >= this.host.nativeElement.children.length) {j = 0}
          }

        // Animate transition to ++right page
        const animation: AnimationPlayer = this.animationBuilder
        .build([
          style({transform: `translate(calc(-50% + ${-(- (this.elementChildrenWidth + this.elementGap) - (this.swipeDistance - this.swipeCompensation))}px))`}),
          animate(`150ms ease`,
            style({transform: `translate(-50%)`})
          )
        ])
        .create(this.host.nativeElement);
        animation.onDone( () => {
        this.renderer.setStyle(
          this.host.nativeElement,
          'transform',
          `translate(-50%)`
        ),
        animation.destroy()
        })
        animation.play();

      // If scrolled less than a half of a child element
      } else if (this.swipeDistance) {

        // Animate transition to current page
        const animation: AnimationPlayer = this.animationBuilder
        .build([
          style({transform: `*`}),
          animate(`150ms ease`,
            style({transform: `translate(-50%)`})
          ),
          style({transform: '*'}),
        ])
        .create(this.host.nativeElement);
        animation.onDone( () => {
        this.renderer.setStyle(
          this.host.nativeElement,
          'transform',
          `translate(-50%)`
        ),
        animation.destroy()
        })
        animation.play();
      }
    }

    // Reset swipe compensation for next swipes
    this.swipeCompensation = 0;
  }
}
