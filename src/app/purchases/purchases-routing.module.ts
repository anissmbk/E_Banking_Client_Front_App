import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchasesComponent} from './purchases.component';
import {OperatorComponent} from './operator/operator.component';
import {PurchaseFormComponent} from "./purchase-form/purchase-form.component";

const routes: Routes = [{
  path: '',
  component: PurchasesComponent,
  children: [{
    path: 'operators',
    component: OperatorComponent,
  }, {
    path: 'purchase',
    component: PurchaseFormComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule {
}
