import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reviewer } from '../../../../core/domain/modules';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './select-reviewer-dialog.component.html',
  styleUrls: ['./select-reviewer-dialog.component.scss']
})
export class SelectReviewerDialogComponent implements OnInit {
  reviewers: Observable<Reviewer[]> = new Observable<Reviewer[]>();

  modifiedReviewers: Reviewer[] = [];

  constructor(
    private dialogRef: MatDialogRef<SelectReviewerDialogComponent>,
    private firestoreService: FirestoreService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  submit() {
    this.dialogRef.close(this.modifiedReviewers);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.reviewers = this.firestoreService.findAll();
  }
}
