import { Directive, TemplateRef, ViewContainerRef, Input, Output, Renderer2, inject, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appIfDropdown]'
})
export class IfDropdownDirective {
/**
 * Description:
 * This structural directive is designed for creating a dropdown element controlled by a parent element, typically a button.
 * It manages the visibility of the dropdown based on a boolean value and a toggle function provided by the parent component.
 *
 * @usageNotes
 * To use this directive, apply it to an `ng-template` containing the dropdown element. The visibility of the dropdown is
 * determinedo by the bolean value provided to the `appIfDropdown` input, and the dropdown is toggled using the function
 * specified in the `appIfDropdownToggle` output.
 *
 * @example
 * ```html
 * <button (click)="toggleDropdown()">Toggle Dropdown</button>
 * <ng-template [appIfDropdown]="isDropdownVisible" (appIfDropdownToggle)="toggleDropdown()">
 *   <!-- Your dropdown content here -->
 * </ng-template>
 * ```
 *
 * @param {Input<boolean>} appIfDropdown - A boolean value from the parent component determining the visibility of the dropdown.
 * @param {Output<void>} appIfDropdownToggle - An event emitted when the dropdown visibility should be toggled. Listen to this
 * event in the parent component to perform the toggle action.
 *
 * @remarks
 * In most this directive created to hold functionality for handling mouse events to close the dropdown when clicking outside of it.
 */

  private readonly renderer: Renderer2 = inject(Renderer2);
  private listeners: Array<() => void> = [()=>{}];

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef
  ) {}

  @Output()
  appIfDropdownToggle = new EventEmitter<void>();

  @Input()
  set appIfDropdown (show: boolean) {

    if (show) {

      this.view.createEmbeddedView(this.template);
      let mouseOnElement: boolean = true;

      this.listeners.push(
        this.renderer.listen(this.template.elementRef.nativeElement.parentElement, 'mouseenter', ()=>{
            mouseOnElement = true;
        })
      );

      this.listeners.push(
        this.renderer.listen(this.template.elementRef.nativeElement.parentElement, 'mouseleave', ()=>{
              mouseOnElement = false;
        })
      );

      this.listeners.push(
        this.renderer.listen(document, 'click', ()=>{
            if (!mouseOnElement) {
              this.appIfDropdownToggle.emit();
              this.view.clear();
              for (let i = 0; i < this.listeners.length; i++) {this.listeners[i]()}
            }
        })
      )
    }
  }

  
}
