import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  productList$!:Observable<any[]>;
  productTypeList$!:Observable<any[]>;
  productReactiveForm!: FormGroup;
  submitted = false;

  constructor(private service:ProductApiService) { 
    this.productReactiveForm = new FormGroup({
      "pname": new FormControl(null, Validators.required),
      "pprice": new FormControl(null, Validators.required),
      "pproductTypeId": new FormControl(null, Validators.required),
      "active": new FormControl(null, Validators.required)
    });
  }

  get LoadFormInstance() {
    return this.productReactiveForm.controls;
  }

  @Input() product:any;
  id: number = 0;
  name: string = "";
  price!: number;
  productTypeId: number = 0;
  active: any = null;
 
  ngOnInit(): void {    
    this.id = this.product.id;
    this.name = this.product.name;
    this.price = this.product.price;
    this.productTypeId = this.product.productTypeId;
    this.active = this.product.active === false ? false : true;
    this.productList$ = this.service.getProductList();
    this.productTypeList$ = this.service.getProductTypeList();    
  }

  addProduct() {
      var product = {
        name: this.name,
        price: this.price,
        productTypeId: this.productTypeId,
        active: this.active
    }

    this.service.addProduct(product).subscribe( res => {
      var closeModelBtn = document.getElementById('add-edit-model-close');
      
      if(closeModelBtn) {
        closeModelBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');

      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }

      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 14000);
    })
  }

  updateProduct() {
    var product = {
      id: this.id,
      name: this.name,
      price: this.price,
      productTypeId: this.productTypeId,
      active: this.active
    }

    var id:number = this.id;

    this.service.updateProduct(id,product).subscribe( res => {
      var closeModelBtn = document.getElementById('add-edit-model-close');
      
      if(closeModelBtn) {
        closeModelBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');

      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }

      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 14000);
    })
  }

  onSubmit(form:any) {
    this.submitted = true;
    var name = form.pname;
    var price = form.price;
    var producttype = form.productTypeId;
    var active = form.active;
    console.log(this.productReactiveForm);
  }
}
