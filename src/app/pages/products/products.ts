import { Component, inject, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { ProductCard } from "../../core/components/product-card";
import { productActions } from "./store/product-actions";
import { productFeature } from "./store/product-feature";

@Component({
    selector: 'app-products',
    imports: [ProductCard],
    template: `
       <div class="py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-8">Products</h1>
        <div class="search">
          <input
          (input)="onSearch($event)"
            class="w-72 p-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
            type="text"
            placeholder="Search products..."
          />
        </div>
      </div>

      @if(isLoading()) {
      <div class="flex items-center justify-center">
        <p>Loading product...</p>
      </div>
      } @if(products()?.length === 0 && !isLoading()) {
      <div class="flex items-center justify-center">
        <p>No products available.</p>
      </div>
      } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
        }
      </div>
      }
    </div>`,

})
export class Products implements OnInit {

    private readonly store = inject(Store);
    readonly products = toSignal(this.store.select(productFeature.selectFilteredProducts));
    readonly isLoading = toSignal(this.store.select(productFeature.selectIsLoading));

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts() {
        this.store.dispatch(productActions.load());
    }

    onSearch(event: Event) {
        const searchQuery = (event.target as HTMLInputElement).value;
        this.store.dispatch(productActions.search({ searchQuery }));
    }
}
