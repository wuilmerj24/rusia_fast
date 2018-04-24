import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams,ViewController } from 'ionic-angular';
import { AcercaPage } from '../../pages/acerca/acerca';

/**
 * Generated class for the DetallesReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalles-reserva',
  templateUrl: 'detalles-reserva.html',
})
export class DetallesReservaPage {
	
	@ViewChild(Slides) slides: Slides;

	
    public categories = [{id:1, name:'Resumen', visible:false},
    {id:2, name:'Descripción', visible:false},
    {id:3, name:'Documentos', visible:false},
    {id:4, name:'Costos Generales', visible:false},
    {id:5, name:'Costos por ciudad', visible:false},
    {id:6, name:'Gatos extras', visible:false},
    {id:7, name:'Comentarios', visible:false}];
    public selectedCategory;
    public showLeftButton: boolean;
    public showRightButton: boolean;

    private reserva;
    private editable = false;
	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

		this.reserva = this.navParams.get('reserva');
		this.initializeCategories();
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetallesReservaPage');
  	}

  	closeModal(x) {
	    if (x == 'x') {
	        this.viewCtrl.dismiss(null);
	    } else {
	        //this.viewCtrl.dismiss(this.item);
	    }
	}

  	initializeCategories() {

        // Select it by defaut
        console.log(this.categories)
        this.selectedCategory = this.categories[0];
        this.selectedCategory.visible = true;

        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    }

    public filterData(categoryId: number): void {
        // Handle what to do when a category is selected
        //console.log(categoryId);

        Object.keys(this.categories).forEach(key=> {

        	if(this.categories[key].id == categoryId){
        		this.categories[key].visible = true;
        	}else{
        		this.categories[key].visible = false;
        	}
		    //console.log(this.categories[key]);
		});
    }

    // Method executed when the slides are changed
    public slideChanged(): void {
        let currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    }

    // Method that shows the next slide
    public slideNext(): void {
        this.slides.slideNext();
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.slides.slidePrev();
    }

}
