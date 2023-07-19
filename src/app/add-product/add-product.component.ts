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

  /** Flag to indicate whether a product has been successfully added. */
  isAdded: boolean = false;

  /** Holds the information of the added product. */
  addedProduct: Products | null = null; 

  /** Flag to indicate whether the watch is deleted */
  deleteMessage : boolean = false;

  /** Array to store existing products (watches). */
  watches: Products[] = [];
  
  constructor(private sanitizer: DomSanitizer, private productService: ProductServiceService) { }

  
  ngOnInit(): void {
    // Fetch existing products (watches) from the productService
    this.watches = this.productService.watches;
  }

  /** Object to hold the details of the product to be added. */
  product: Products = {
    price: 0,
    cartAdded: false,
    model: '',
    info: '',
    smallInfo: '',
    productImages: {},
  }

  /**
   * @method addProduct
   * Adds a new product.
   * @param productForm - Angular form to reset after adding a product.
   * @memberof AddProductComponent
   */
  addProduct(productForm: NgForm): void {
    // Prepare product data and save it
    const productFormData = this.prepareProduct(this.product);
    this.saveProductData(productFormData);
    productForm.reset();
  }

  /**
   * @method saveProductData
   * Saves the product data to database using the productService.
   * @param productFormData - Form data of the product to be added.
   * @memberof AddProductComponent
   */
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

  /**
   * @method prepareProduct
   * Prepares product data as FormData for sending to the server.
   * @param product - Product object to be prepared for submission.
   * @returns Form data containing the product details.
   * @memberof AddProductComponent
   */
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

  /**
   * @method onFileSelect
   * Handles file selection for product images.
   * @param event - Event containing the file selected by the user.
   * @memberof AddProductComponent
   */
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

  /**
   * @method hideMessage
   * Hides the success message after adding a product.
   * @memberof AddProductComponent
   */
  hideMessage(): void {
    this.isAdded = false;
  }

  /**
   * @method removeWatches
   * Removes a product (watch) by its ID.
   * @param id - ID of the product to be removed.
   * @memberof AddProductComponent
   */
  removeWatches(id: any): void {
    this.productService.removeProduct(id).subscribe(
      (resp) => {
        console.log("item deleted");  
      },
      (error: HttpErrorResponse) => console.log(error.message)
    )
  } 
}
