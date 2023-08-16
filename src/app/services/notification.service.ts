import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:4401/api/notification';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    return new Observable<any>((observer) => {
      const eventSource = new EventSource(`${this.baseUrl}/notifications`);
      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };
    });
  }

  getNotificationsCount(): Observable<any> {
    return new Observable<any>((observer) => {
      const eventSource = new EventSource(`${this.baseUrl}/unseen-count`);
      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };
    });
  }

  markNotificationAsRead(notificationId: string): Observable<Notification> {
    const url = `${this.baseUrl}/notifications/mark-read/${notificationId}`;
    return this.http.patch<Notification>(url, {});
  }
}
