import {AfterViewInit, Component, Inject, OnDestroy} from '@angular/core';
import { FakeUserService } from "./fake-users-service/fake-user-service";
import {Permission, Modif, User} from "./fake-users-service/user";
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FakeUserService]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title: string = 'Supermarket Permission Manager with AngularJS';
  users: User[];
  selectedUser: User = null;
  manager: Permission = Permission.MANAGER;
  storekeeper: Permission = Permission.STOREKEEPER;
  visitor: Permission = Permission.VISITOR;
  selectedDate: Date = new Date();
  tmpDate: Date = null;
  timer: number;
  dateString: string = this.selectedDate.toLocaleString();
  isValidEditInput: boolean = false;

  constructor(@Inject(FakeUserService)private userService){
    this.users = this.userService.getUsers();
    this.timer = this.userService.getTimer();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onSelectedUser(user: User): void {
    this.selectedUser = user;
  }

  onSelectedPermission(selectedPermission: Permission, checked: boolean): void {
    if (checked)
      this.userService.updateUserPermission(this.selectedUser, selectedPermission, null);
    else if (this.selectedDate.getTime() > Date.now())
      this.userService.updateUserPermission(this.selectedUser, selectedPermission, this.selectedDate);
  }

  onClickEdit() : void {
      $('#editModal').modal('show');
  }

  onClickEditClose() : void {
    $('#editModal').modal('hide');
  }

  onClickEditConfirm(valueFN: string, valueLN: string) : void {
    this.userService.updateUserName(this.selectedUser, valueFN, valueLN);
    $('#editModal').modal('hide');
  }

  onDateChange() : void {
      if (this.tmpDate != null && !isNaN(this.tmpDate.getTime()))
      {
        this.selectedDate = this.tmpDate;
        this.dateString = this.selectedDate.toLocaleString();
      }
  }
  /*
  strContainsNumber(value: string): boolean {
    return /\d/.test(value);
  }*/

  strContainsOnlyAlphabet(value: string) : boolean {
    return /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/.test(value);
  }
  checkNameValidity(valueFN: string, valueLN: string) {
      if (valueFN.length < 3 || valueLN.length < 3 || !this.strContainsOnlyAlphabet(valueLN) || !this.strContainsOnlyAlphabet(valueFN))
      {
        this.isValidEditInput = false;
        return;
      }
      this.isValidEditInput = true;
  }

  checkDateValidity(checked: boolean): boolean {
    if (this.selectedDate.getTime() <= Date.now() && !checked)
      return false;
    return true;
  }

  displayExpirationDate(): string
  {
    if (this.selectedUser != null && this.selectedUser.lastModif != null)
    {
      if (this.selectedUser.lastModif.expireDate != null && this.selectedUser.lastModif.expireDateStr != null)
        return this.selectedUser.lastModif.expireDateStr;
      else
        return "PERMANENT";
    }
    return "";
  }
}
