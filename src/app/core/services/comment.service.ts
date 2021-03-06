import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CodeFile, Comment} from '../domain/modules';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly endpoint: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.postServer}/v1/comments`;
  }

  save(comment: Comment): Observable<CodeFile> {
    return this.httpClient.post<Comment>(`${this.endpoint}`, comment);
  }
}
