import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { NewPostDialogComponent } from './new-post/new-post.dialog';

@NgModule({
  declarations: [AppComponent, NewPostDialogComponent],
  entryComponents: [NewPostDialogComponent],
  imports: [
    ApolloModule,
    BrowserModule,
    HttpClientModule,
    HttpLinkModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:4000' }),
      cache: new InMemoryCache(),
    });
  }
}
