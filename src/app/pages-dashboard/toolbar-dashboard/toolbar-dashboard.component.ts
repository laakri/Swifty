import { Component, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-toolbar-dashboard',
  templateUrl: './toolbar-dashboard.component.html',
  styleUrls: ['./toolbar-dashboard.component.css'],
})
export class ToolbarDashboardComponent implements OnInit {
  isBrightTheme = false;
  sidebarVisible: boolean = false;
  newUnseenCount: number = 0;
  cd: any;
  notificationSound!: HTMLAudioElement;

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    const notificationIcon = '\u25CF';

    this.notificationSound = new Audio(
      '../../../assets/admin-section/Notification.mp3'
    );
    this.notificationService
      .getNotificationsCount()
      .subscribe((updatedNotification) => {
        this.newUnseenCount = updatedNotification.unseenCount;
        this.notificationSound.play();
        this.updateDocumentTitle();
        this.cd.detectChanges();
      });
    this.updateDocumentTitle();
  }
  updateDocumentTitle() {
    if (this.newUnseenCount > 0) {
      const notificationIcon = '\u25CF';
      document.title = `${notificationIcon} [${this.newUnseenCount}] Swifty Dashboard`;
    } else {
      document.title = 'Swifty Dashboard';
    }
  }

  markAsRead() {
    this.notificationService
      .getNotificationsCount()
      .subscribe((updatedNotification) => {
        this.newUnseenCount = updatedNotification.unseenCount;
        this.updateDocumentTitle();
        this.cd.detectChanges();
      });
  }
  toggleNotification() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  change_theme(): void {
    this.isBrightTheme = !this.isBrightTheme;
    const body = document.body;
    if (this.isBrightTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
}
