import { Directive, Input, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the MesaDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[mesa]' // Attribute selector
})
export class MesaDirective {
  @Input() estado: string;

  constructor(private element : ElementRef, private renderer : Renderer) { }
  ngOnInit()
  {
    if(this.estado=="ocupada") {
      this.renderer.setElementStyle( this.element.nativeElement, "background-color", "#f5f11260");
  
    }

    if(this.estado=="disponible") {
      this.renderer.setElementStyle( this.element.nativeElement, "background-color", "#38fc3167 ");
  
    }

  }


}
