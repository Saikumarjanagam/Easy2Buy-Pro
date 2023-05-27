import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService) { }
  users: User[] = []
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.userService.read().subscribe(
      (response) => {
        this.users = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as User
          }
        })
      }
    )
  }
}
