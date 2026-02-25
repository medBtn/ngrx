import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductApi } from "../services/product-api";
import { productActions } from "./product-actions";

export const productEffect = createEffect(
    (actions$ = inject(Actions), productApi = inject(ProductApi)) => {
        return actions$.pipe(
            ofType(productActions.load),
            mergeMap(() => {
                return productApi.getProducts().pipe(
                    map((products) => productActions.loadSuccess({ products })),
                    catchError((error) => of(productActions.loadFailure({ error: error.message })))
                )
            })
        )

    }, { functional: true })

