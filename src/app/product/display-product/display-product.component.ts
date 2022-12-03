import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from 'src/app/service/product-api.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {

  productList$!:Observable<any[]>;
  productTypesList$!:Observable<any[]>;
  productTypesList:any=[];  
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  // To customize page size
  //tableSizes: any = [5, 10, 15, 20];

  tabHeaders: string[] = ['Id','Name','Price','Product Type','Active','Options'];
  sortedHeader!: string;

  // Map to display data associated with foreign keys
  productTypesMap:Map<number, string> = new Map()

  constructor(private service: ProductApiService) { }

  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
    this.productTypesList$ = this.service.getProductTypeList();
    this.refreshProductTypesMap();
    this.tabHeaders;
  }

  // Variable or properties
  modalTitle: string = '';
  activateAddEditProductComponent: boolean = false;
  product: any;

  modalAdd() {
    this.product = {
      id:0,
      name:null,
      price:null,
      productTypeId:null,
      active:null
    }
    this.modalTitle = "Add Product";
    this.activateAddEditProductComponent = true;
  }

  modalEdit(item:any) {
    this.product = item;
    this.modalTitle = "Edit Product";
    this.activateAddEditProductComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure if you want to delete the product ${item.name}`)) {
      this.service.deleteProduct(item.id).subscribe(res => {
        var closeModelBtn = document.getElementById('add-edit-model-close');
      
        if(closeModelBtn) {
          closeModelBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');

        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }

        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 14000);
        this.productList$ = this.service.getProductList();
      })
    }
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productList$ = this.service.getProductList();
  }

  refreshProductTypesMap() {
    this.service.getProductTypeList().subscribe(data => {
      this.productTypesList = data;
      
      for(let i = 0; i < data.length; i++)
      {
        this.productTypesMap.set(this.productTypesList[i].id, this.productTypesList[i].productTypeName)
      }
    })
  }

  onProductListChange(event: any) {
    this.page = event;
    this.productList$;
  } 
}
