import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { UserPageComponent } from './pages/user-page.component';
import { AdminPageComponent } from './pages-dashboard/admin-page.component';
import { ErrorInterceptor } from './error-interceptor';
import { AddProductComponent } from './pages-dashboard/add-product/add-product.component';
import { DashboardComponent } from './pages-dashboard/dashboard/dashboard.component';
import { ProductListComponent } from './pages-dashboard/product-list/product-list.component';
import { UsersListComponent } from './pages-dashboard/users-list/users-list.component';

/**********  Prime NG *************** */

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarDashboardComponent } from './pages-dashboard/toolbar-dashboard/toolbar-dashboard.component';
import { SidebarDashboardComponent } from './pages-dashboard/sidebar-dashboard/sidebar-dashboard.component';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from './components/footer/footer.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductPageComponent,
    ShoppingCartComponent,
    CategorieComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    CheckoutPageComponent,
    UserPageComponent,
    AddProductComponent,
    DashboardComponent,
    ProductListComponent,
    AdminPageComponent,
    ToolbarDashboardComponent,
    SidebarDashboardComponent,
    UsersListComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    DropdownModule,
    PanelModule,
    MenuModule,
    TieredMenuModule,
    ChipModule,
    CheckboxModule,
    MessagesModule,
    ToastModule,
    SidebarModule,
    SlideMenuModule,
    ReactiveFormsModule,
    BadgeModule,
    FileUploadModule,
    TableModule,
    DropdownModule,
    ListboxModule,
    MultiSelectModule,
    CarouselModule,
    TabViewModule,
    CardModule,
    DividerModule,
    PaginatorModule,
    ProgressSpinnerModule,
    GalleriaModule,
    ImageModule,
    InputNumberModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
