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
  watches: Products[] = [];
  urlGetProduct : string = environment.getProducts;
  urlAddProduct : string = environment.addProduct;
  urlRemoveProduct : string = environment.removeProduct;
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    this.getProducts();
  }

  addProduct(product: FormData) : Observable<Products>{
    return this.httpClient.post<Products>(this.urlAddProduct, product);
  }

  removeProduct(id: any) : Observable<Products>{
    return this.httpClient.delete<Products>(this.urlRemoveProduct + id)
  }

  getProducts(): void {
    this.httpClient.get<Products[]>(this.urlGetProduct).pipe(
      map((x: Products[], i) => x.map((product: Products) => this.createImages(product)))
    )
      .subscribe((response: Products[]) => {
        this.watches = response;
      }
        ,
        (error: HttpErrorResponse) => console.log(error));;
  }

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
  
  findByModel(property: string): Products {
    const lowerCaseProperty = property.toLowerCase();
    let foundWatch = this.watches.filter(watch => watch.model.toLowerCase() === lowerCaseProperty);
     return foundWatch[0];
  }
}
