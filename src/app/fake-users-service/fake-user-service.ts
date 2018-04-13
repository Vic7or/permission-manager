import { Injectable } from '@angular/core';
import {Permission, Modif, User} from "./user";

@Injectable()
export class FakeUserService {
  timer: number;
  users: User[] = [
    new User("Kerri", "Jackson", Permission.MANAGER, null),
    new User("Patrick", "Bean", Permission.STOREKEEPER, null),
    new User("Felicia", "Rosales", Permission.VISITOR, null),
    new User("Kayle", "Hernandez", Permission.MANAGER, null),
    new User("Jane", "Sellers", Permission.STOREKEEPER, null),
    new User("Jenny", "Lucas", Permission.VISITOR, null),
    new User("Alex", "Erickson", Permission.MANAGER, null),
    new User("Kimberly", "Johns", Permission.STOREKEEPER, null),
    new User("Laure", "Hutchinson", Permission.VISITOR, null),
    new User("Mick", "Mundy", Permission.MANAGER, null),
    new User("Luc", "Hiett", Permission.STOREKEEPER, null),
  ];

  constructor() {
   this.timer = setInterval(()=>{
     this.users.forEach((user: User)=> {
       if (user.lastModif != null && user.lastModif.expireDate != null && user.lastModif.expireDate.getTime() <= Date.now())
       {
         user.permission = user.lastModif.previousPerm;
         user.lastModif = null;
       }
     });
   }, 10000);
  }

  getUsers(): User[] {
      return this.users;
  }

  getTimer(): number {
    return this.timer;
  }

  updateUserPermission(user: User, newPerm: Permission, expireDate: Date): void {
    user.lastModif = new Modif(user.permission, expireDate);
    user.permission = newPerm;
  }

  updateUserName(user: User, newFN: string, newLN: string): void {
    user.firstName = newFN;
    user.lastName = newLN;
  }
}
