export enum Permission {
  Read = 'read',
  Write = 'write',
  Delete = 'delete',
  Update = 'upate',
  ManageAdmins = 'manageAdmins',
  ManageUsers = 'manageUsers',
  UpdateSelf = 'updateSelf',
  DeleteSelf = 'deleteSelf',
  Ban = 'ban',
}
export enum Role {
  Super = 'super',
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}
export type Roles = {
  super: Permission[]
  admin: Permission[]
  user: Permission[]
  guest: Permission[]
}
export const roles: Roles = {
  super: [
    Permission.Read,
    Permission.ManageAdmins,
    Permission.ManageUsers,
    Permission.Ban,
    Permission.Delete,
    Permission.DeleteSelf,
    Permission.Update,
    Permission.UpdateSelf,
    Permission.Write,
  ],
  admin: [
    Permission.Read,
    Permission.ManageUsers,
    Permission.Ban,
    Permission.Delete,
    Permission.DeleteSelf,
    Permission.Update,
    Permission.UpdateSelf,
    Permission.Write,
  ],
  user: [
    Permission.Read,
    Permission.Write,
    Permission.DeleteSelf,
    Permission.UpdateSelf,
  ],
  guest: [],
}
