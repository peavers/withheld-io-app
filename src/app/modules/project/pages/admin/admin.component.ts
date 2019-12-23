import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreUser, Reviewer } from '../../../../core/domain/modules';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReviewGroupDialogComponent } from '../../../../shared/component/review-group-dialog/review-group-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  reviewers: Observable<FirestoreUser[]> = new Observable<FirestoreUser[]>();

  private itemsCollection: AngularFirestoreCollection<FirestoreUser>;

  constructor(
    public firestoreService: FirestoreService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.itemsCollection = this.firestore.collection<FirestoreUser>('users');
    this.reviewers = this.itemsCollection.valueChanges();
  }

  update(reviewer: FirestoreUser) {
    const dialogRef = this.dialog.open(ReviewGroupDialogComponent, {
      width: '40vw',
      data: reviewer
    });

    dialogRef.afterClosed().subscribe((firestoreUser: FirestoreUser) => {
      if (firestoreUser) {
        this.snackBar.open('Working');

        this.firestoreService.update(firestoreUser).then(
          result => {
            this.snackBar.open('Reviewer saved', null, {
              duration: 5 * 1000
            });
          },
          error => {
            this.snackBar.open('Reviewer failed', null, {
              duration: 5 * 1000
            });
          }
        );
      }
    });
  }

  delete(reviewer: Reviewer) {
    this.firestoreService.delete(reviewer);
  }
}
