import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { DisplayProductComponent } from './product/display-product/display-product.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { ProductApiService } from './service/product-api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortPipe } from './shared/pipes/sort.pipe';
import { MatButtonToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DisplayProductComponent,
    AddEditProductComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    NgxPaginationModule,
    MatButtonToggleModule

  ],
  providers: [ProductApiService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
