import {NgModule} from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { EnquireModule } from './enquire/enquire.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { UploadModule } from './uploads/shared/upload.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HomeModule,
    SharedModule,
    LoginModule,
    LayoutModule,
    EnquireModule,
    CategoriesModule,
    UsersModule,
    LinksModule,
    UploadModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
