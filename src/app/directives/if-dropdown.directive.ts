import { Directive, TemplateRef, ViewContainerRef, Input, Output, Renderer2, inject, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appIfDropdown]'
})
export class IfDropdownDirective {
/**
 * Structural directive for creating a dropdown element controlled by a parent element (button)
 *
 * @usageNotes
 * To use the directive, apply it to the ng-template, containing the dropdown element.
 * 
 * @param appIfDropdown - A boolean value from the parent component determining the visibility of the dropdown element.
 * @param appIfDropdownToggle - A function from the parent component that toggles the visibility of the dropdown element.
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
