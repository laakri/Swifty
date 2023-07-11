import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuth = false;
  title = 'Swifty';
  private isAuthListenerSubs!: Subscription;

  constructor(private UsersService: UsersService) {}

  ngOnInit(): void {
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.isAuth = this.UsersService.getIsAuth();
    this.UsersService.autoAuthUser();
  }
}
