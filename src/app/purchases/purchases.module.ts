import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperatorComponent} from './operator/operator.component';
import {PurchasesComponent} from './purchases.component';
import {RouterModule} from "@angular/router";
import {PurchasesRoutingModule} from "./purchases-routing.module";
import {OperatorFavoriteComponent} from './operator-favorite/operator-favorite.component';
import {PurchasesHistoryComponent} from './purchases-history/purchases-history.component';
import {PurchaseHistoryDetailsComponent} from './purchase-history-details/purchase-history-details.component';
import {PurchaseFormComponent} from './purchase-form/purchase-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [PurchasesComponent, OperatorComponent, OperatorFavoriteComponent, PurchasesHistoryComponent, PurchaseHistoryDetailsComponent, PurchaseFormComponent],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ]
})
export class PurchasesModule {
}
