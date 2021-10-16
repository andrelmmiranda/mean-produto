import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{
  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  createProduct(): void{
   if(this.product.name === '' || this.product.price === null){
     this.productService.showMessage('Os campos devem estar preenchidos');
     return;
   }
    
    this.productService.create(this.product).subscribe(()=>{
      this.productService.showMessage('Produto Salvo!');
    })
    this.router.navigate(['/products']);
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}