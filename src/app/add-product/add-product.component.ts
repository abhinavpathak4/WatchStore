import { Component, OnInit } from '@angular/core';
import { Products } from '../interfaces/products';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../interfaces/File-handle.model';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isAdded: boolean = false;
  addedProduct: Products | null = null; 
  watches: Products[] = [];
  
  constructor(private sanitizer: DomSanitizer, private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.watches = this.productService.watches;
  }

  
  product: Products = {
    price: 0,
    cartAdded: false,
    model: '',
    info: '',
    smallInfo: '',
    productImages: {},
  }

  addProduct(productForm: NgForm): void {
    const productFormData = this.prepareProduct(this.product);
    this.saveProductData(productFormData);
    productForm.reset();
  }

  saveProductData(productFormData: FormData): void {
    this.productService.addProduct(productFormData).subscribe(
      (response: Products) => {
        this.addedProduct = response; 
        this.isAdded = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
      }
    );
  }

  prepareProduct(product: Products): FormData {
    const productData: FormData = new FormData();
    productData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    if (product.productImages && product.productImages.file) {
      productData.append(
        'imageFile',
        product.productImages.file,
        product.productImages.file.name
      );
    }
    return productData;
  }

  
  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.product.productImages = fileHandle;
    }
  }


  hideMessage(): void {
    this.isAdded = false;
  }
  
  removeWatches(id: any): void {
    this.productService.removeProduct(id).subscribe(
      (resp) => {
        console.log("item deleted");  
      },
      (error: HttpErrorResponse) => console.log(error.message)
    )
  } 
  
}


