import { Directive, Input, Output, Renderer2, inject, EventEmitter, ElementRef} from '@angular/core';

/**
 * @classdesc
 *   Directive to control the visibility property of a dropdown element.
 * 
 * @constructor
 *   Inject necessary services.
 * 
 * @Input dropdownStatus: boolean
 *   A boolean value from the parent component determining the visibility of the dropdown.
 * @Output dropdownToggle: EventEmitter<void>
 *   An event emitted when the dropdown should be hiden by click outside of an element.
 *   Listen to this event by the dropdown toggle function.
 * 
 * @usageNotes
 *   To use this directive, apply it to a dropdown element. The visibility of the dropdown is determined by the bolean value
 *   provided to the `dropdownStatus` input, and the dropdown is toggled using the CSS visibility property
 * 
 * @remarks
 *   In most this directive created to hold functionality for handling mouse events to close the dropdown when clicking outside of it.
 * 
 * @example
 *   ```html
 *   <button (click)="toggleDropdown()">Toggle Dropdown</button>
 *   <element class="dropdown"
 *     appDropdown
 *       [dropdownStatus]="isDropdownVisible"
 *       (dropdownToggle)="toggleDropdown()"
 *   >
 *     <!-- Dropdown content here -->
 *   </element>
 *   ```
 */
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  private readonly renderer: Renderer2 = inject(Renderer2);
  constructor(
    private host: ElementRef
  ) {}

  private listeners: Array<() => void> = [()=>{}];
  @Input()
  set dropdownStatus(show: boolean) {

    if (show) {

      this.renderer.setStyle(this.host.nativeElement, 'visibility', 'visible')

      let mouseOnElement: boolean = true;

      this.listeners.push(
        this.renderer.listen(this.host.nativeElement.parentElement, 'mouseenter', ()=>{
            mouseOnElement = true;
        })
      );

      this.listeners.push(
        this.renderer.listen(this.host.nativeElement.parentElement, 'mouseleave', ()=>{
              mouseOnElement = false;
        })
      );

      this.listeners.push(
        this.renderer.listen(document, 'click', ()=>{
            if (!mouseOnElement) {
              this.dropdownToggle.emit();
              this.renderer.setStyle(this.host.nativeElement, 'visibility', 'hidden')
              for (let i = 0; i < this.listeners.length; i++) {this.listeners[i]()}
            }
        })
      )
    } else {
      this.renderer.setStyle(this.host.nativeElement, 'visibility', 'hidden')
    }
  }

  @Output() dropdownToggle = new EventEmitter<void>();
  
}
