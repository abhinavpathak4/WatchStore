import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';
import { FileHandle } from '../interfaces/File-handle.model'
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  // Array to store the list of watches
  watches: Products[] = [];

  // URL for getting the products from the backend
  urlGetProduct: string = environment.getProducts;

  // URL for adding a new product to the backend
  urlAddProduct: string = environment.addProduct;

  // URL for removing a product from the backend
  urlRemoveProduct: string = environment.removeProduct;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    // Fetch the products from the backend when the service is initialized
    this.getProducts();
  }

  /**
   * @method addProduct
   * Adds a new product to the database.
   * @param product The product data to be added.
   * @returns An Observable containing the added product.
   * @memberof ProductServiceService
   */
  addProduct(product: FormData): Observable<Products> {
    return this.httpClient.post<Products>(this.urlAddProduct, product);
  }

  /**
   * @method removeProduct
   * Removes a product from the database by its ID.
   * @param id The ID of the product to be removed.
   * @returns An Observable containing the response.
   * 
   */
  removeProduct(id: any): Observable<string> {
    return this.httpClient.delete<string>(this.urlRemoveProduct + id)
  }

  /**
   * @method getProducts
   * Fetches the list of products from the database and creates images for each product.
   * @memberof ProductServiceService
   */
  getProducts(): void {
    this.httpClient.get<Products[]>(this.urlGetProduct).pipe(
      map((x: Products[]) => x.map((product: Products) => this.createImages(product)))
    )
    .subscribe(
      (response: Products[]) => {
        this.watches = response;
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  /**
   * @method createImages
   * Creates a FileHandle for the product's image.
   * @param product The product whose image is being processed.
   * @returns The product with the FileHandle for its image.
   * @memberof ProductServiceService
   */
  createImages(product: Products): Products {
    const productImages: any = product.productImages;
    if (!productImages || !productImages.picByte || !productImages.type || !productImages.name) {
      throw new Error('Invalid image data');
    }
    const imageBlob = this.dataURItoBlob(productImages.picByte, productImages.type);
    const imageFile = new File([imageBlob], productImages.name, { type: productImages.type });
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile));
    const finalFileHandle: FileHandle = {
      file: imageFile,
      url: url
    };
    const productImagesToFileHandle = finalFileHandle;
    product.productImages = productImagesToFileHandle;
    return product;
  }

  /**
   * @method dataURItoBlob
   * converts data from uri to blob
   * @param picBytes data to be converted.
   * @param imageType The type of the image data.
   * @returns The Blob object representing the image.
   * @memberof ProductServiceService
   */
  dataURItoBlob(picBytes: string, imageType: string): Blob {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }

  /**
   * @method findByModel
   * Finds a product in the watches list by its model property.
   * @param property The model property to search for.
   * @returns The found product, if any; otherwise, undefined.
   * @memberof ProductServiceService
   */
  findByModel(property: string): Products  {
    const lowerCaseProperty = property.toLowerCase();
    const foundWatch = this.watches.filter(watch => watch.model.toLowerCase() === lowerCaseProperty);
    return foundWatch[0];
  }
}
