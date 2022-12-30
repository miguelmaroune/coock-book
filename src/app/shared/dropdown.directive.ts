import { Directive , HostListener , HostBinding } from '@angular/core'

@Directive({
    selector: '[appDropdown]'
})
export class DropDownDirective {

//host binding to bind to an element here i am binding to the style  class
  @HostBinding('class.open') isOpen = false;
  // host listener to catch the event  it can also be (mouseenter ,mouseleave  ) ect ...
  @HostListener('click') toggleOpen () {
  this.isOpen = !  this.isOpen;
  };

}
