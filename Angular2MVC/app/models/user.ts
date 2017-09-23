/**
 These interface properties are same as User table in database.

The awesome thing about Angular2 is, user object will automatically be mapped to array of IUser
interface when we will load data from database through RESTful API.

*/
export interface IUser {
    Id: number,
    FirstName: string,
    LastName: string,
    Gender: string
}