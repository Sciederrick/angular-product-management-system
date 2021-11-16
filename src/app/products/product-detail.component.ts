import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product!: IProduct;
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.productService.getProductById(id).subscribe({
      next: product => {
        this.product = product[0];
        this.pageTitle += `: ${product[0].productName}`;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
