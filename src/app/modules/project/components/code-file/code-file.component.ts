import { Component, Input, OnInit } from '@angular/core';
import { Author, CodeFile, CodeLine, Comment } from '../../../../core/domain/modules';
import { CodeFileService } from '../../../../core/services/code-file.service';

@Component({
  selector: 'app-code-file-component',
  templateUrl: './code-file.component.html',
  styleUrls: ['./code-file.component.scss']
})
export class CodeFileComponent implements OnInit {
  @Input()
  challengeId: string;

  @Input()
  codeFile: CodeFile;

  constructor(private codeFileService: CodeFileService) {}

  ngOnInit() {
    if (this.codeFile.size <= 4000) {
      this.getContent();
    } else {
      console.log('skipping large file: ', this.codeFile.location);
    }
  }

  saveCodeLine($event) {
    this.codeFile.codeLines[$event.id] = $event;

    this.codeFileService.update(this.codeFile);
  }

  getContent() {
    this.codeFileService.findById(this.challengeId, this.codeFile.id).subscribe(result => (this.codeFile = result));
  }
}
