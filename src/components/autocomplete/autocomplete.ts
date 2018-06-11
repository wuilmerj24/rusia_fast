import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the AutocompleteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'autocomplete',
  templateUrl: 'autocomplete.html'
})
export class AutocompleteComponent {

  	text: string;

  	@Input('lista') lista2: any[];
    @Input('default') default: any[];
  	@Input('placeholder') placeholder;
    //@Input('default') default;
    @Output() onselect = new EventEmitter;


  	lista = [];
  	lista_visible = false;
    //lista2 = [];
    buscar = '';
    id = 0
    disabled = true;

  	constructor() {
    	//console.log('Hello AutocompleteComponent Component');
    	//this.text = 'Hello World';
      //this.buscar = this.default;
  	}

  	ngAfterViewInit(){
  		
      //console.log('defaul value is:');
      //console.log(this.default.length);

      if(this.default.length > 0){

        
         setTimeout(() => {
          this.buscar = this.default[1];
          this.id = this.default[0];   
         }, 0)
      }
      
  	}

  	onKey(e) {
        
        //console.log(e);
	    if (this.buscar.length > 0) {
	        console.log('entro en el key ');
	        this.lista_visible = true;
	        this.lista = [];
	        for (var key in this.lista2) {
	            
	            //console.log(JSON.stringify(this.lista2[key]));
	            //console.log(String(this.lista2[key].name).toLowerCase());
	            if (String(this.lista2[key].name).toLowerCase().includes(this.buscar.toLowerCase())) {
	                
	                this.lista.push(this.lista2[key]);
	            }
	        }
	    } else {
	        this.lista_visible = false;
	    }	    
	}

	/*onCancel(e) {
        console.log(e);
        console.log('Si esta cancelando');
        this.lista_visible = false;
        this.lista = [];
    }*/

    selectItem(valor) {
        this.lista_visible = false;
        this.buscar = valor.name;
        this.id = valor.id;     
        console.log(this.id);
        this.onselect.emit(this.id);
    }


}
