import { createFeature, createReducer, on } from "@ngrx/store";
import { Product } from "../types/product-type";
import { productActions } from "./product-actions";


export type ProductState = {
    products: Product[];
    error: string | null;
    isLoading: boolean;
}

export const initialState: ProductState = {
    products: [],
    error: null,
    isLoading: false
}

export const productFeature = createFeature({
    name: 'products',
    reducer: createReducer(
        initialState,
        on(productActions.load, (state) => ({
            ...state,
            isLoading: true,
        })),
        on(productActions.loadSuccess, (state, { products }) => ({
            ...state,
            products,
            isLoading: false,
            error: null
        })),
        on(productActions.loadFailure, (state, { error }) => ({
            ...state,
            error,
            isLoading: false
        }))
    )
})