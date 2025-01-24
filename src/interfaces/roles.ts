export enum Permission {
    Read = "read"
    
}
export enum Role{
    Super = "super",
    Admin = "admin",
    User = "user",
    Guest = "guest"
}
export type Roles = {super:Permission[], admin:Permission[], user:Permission[], guest:Permission[]}
export const roles:Roles = {
    super:[Permission.Read],
    admin:[Permission.Read],
    user:[Permission.Read],
    guest:[]
}