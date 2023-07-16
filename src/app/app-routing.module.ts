import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './pages/user-page.component';
import { AdminPageComponent } from './pages-dashboard/admin-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AddProductComponent } from './pages-dashboard/add-product/add-product.component';
import { DashboardComponent } from './pages-dashboard/dashboard/dashboard.component';
import { ProductListComponent } from './pages-dashboard/product-list/product-list.component';
import { UsersListComponent } from './pages-dashboard/users-list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/v/home', pathMatch: 'full' },

  {
    path: 'v',
    component: UserPageComponent,
    children: [
      { path: '', redirectTo: '/v/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductPageComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'categorie', component: CategorieComponent },
      { path: 'checkout', component: CheckoutPageComponent },
      {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: SignupComponent },
        ],
      },
    ],
  },

  {
    path: 'a',
    component: AdminPageComponent,
    children: [
      { path: '', redirectTo: '/a/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'list-product', component: ProductListComponent },
      { path: 'list-users', component: UsersListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
