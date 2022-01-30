import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/models/pagination';
import { User } from 'src/models/user';
import { UserParams } from 'src/models/userParams';
import { Message } from 'src/models/message';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  getUsers(page: number | undefined, itemsPerPage: number | undefined, userParams: UserParams| undefined): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<User[]>(baseUrl + 'users', { observe: 'response', params})
      .pipe(
        map(response => {
          if(response && response.body){
            paginatedResult.result = response.body;
            const headerPagination = response.headers.get('Pagination');
            if (headerPagination) {
              paginatedResult.pagination = JSON.parse(headerPagination);
            }
        }
          return paginatedResult;
        })
      );
  }

  getUser(id: number | undefined): Observable<User> {
    return this.http.get<User>(baseUrl + 'users/' + id);
  }
  getUserUnreadMessags(id: number): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + 'users/'+ id + '/thread');
  }
  updateUser(id: number, user: User) {
    return this.http.put(baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

  getMessages(id: number, page: number | undefined, itemsPerPage: number | undefined, messageContainer: string): Observable<PaginatedResult<Message[]>> | any {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
      .pipe(
        map(response => {
            if(response && response.body){
            paginatedResult.result = response.body;
            const responsePagination = response.headers.get('Pagination');
            if (responsePagination) {
              paginatedResult.pagination = JSON.parse(responsePagination);
            }
        }
          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: {senderId: number, recipientId: number,content:string}): Observable<Message> {
    return this.http.post<Message>(baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(baseUrl + 'users/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    this.http.post(baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
