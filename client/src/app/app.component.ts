import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { queries, mutations } from './gql-queries';

import { NewPostDialogComponent } from './new-post/new-post.dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public feed: any;
  public drafts: any;
  constructor(private apollo: Apollo, private dialog: MatDialog) {}

  ngOnInit() {
    // Query apollo for published articles
    // (this will return an Observable :)
    this.feed = this.apollo
      .query({
        query: queries.feed,
      })
      .pipe(map(data => data.data['feed']));

    // Query apollo for unpublished drafts
    // (this will return an Observable :)
    this.drafts = this.apollo
      .query({
        query: queries.drafts,
      })
      .pipe(map(data => data.data['drafts']));
  }

  new() {
    /**
     *    Open a Material Dialog for user input
     */

    this.dialog
      .open(NewPostDialogComponent)
      .afterClosed()
      .subscribe(result => {
        console.log('Saving Draft: ', result);

        // Once user input is received,
        // use apollo.mutate to save to server
        this.apollo
          .mutate({
            mutation: mutations.createDraft,
            variables: {
              title: result.title,
              text: result.text,
            },
          })
          .subscribe(
            success => console.log('Draft saved!', success),
            error => console.log('Error during save: ', error)
          );
      });
  }

  publish(id) {
    console.log('Publishing draft: ', id);
    this.apollo
      .mutate({
        mutation: mutations.publish,
        variables: {
          id: id,
        },
      })
      .subscribe(
        result => console.log('Draft published! ', result),
        error => console.log('Error during publish: ', error)
      );
  }
}
