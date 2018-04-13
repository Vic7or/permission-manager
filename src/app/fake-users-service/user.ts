export enum Permission {
  MANAGER = "manager",
  STOREKEEPER = "store keeper",
  VISITOR = "visitor"
}

export class Modif {
  //public previousPerm: Permission;
  //public expireDate: Date;
  public expireDateStr: string;
  public modifDateStr: string;
  constructor(public previousPerm: Permission, public expireDate: Date){
    this.modifDateStr = new Date().toUTCString();
    this.expireDate != null ? this.expireDateStr = this.expireDate.toUTCString() : this.expireDateStr = null;
  }
}

export class User {
  //private id: number;
  //public firstName: string;
  //public lastName: string;
  //public permission: Permission;
  //public lastModif: Modif;
  constructor(public firstName: string, public lastName: string, public permission: Permission, public lastModif: Modif) {
    //this.id = Date.now();
  }
}


