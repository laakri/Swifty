import { Component } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  isLoading = true;
  users: any;

  constructor(private UsersService: UsersService) {}
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.UsersService.getusers().subscribe(
      (user: any) => {
        this.users = user;
        console.log(this.users);
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
