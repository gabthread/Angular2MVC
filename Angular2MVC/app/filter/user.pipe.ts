import { PipeTransform, Pipe } from '@angular/core';
import { IUser } from "../models/user";

@Pipe({ //pipe selector
    name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform { //we must implement PipeTransform interface to create a custom Pipe

    transform(value: IUser[], filter: string): IUser[]
    {
        filter = filter ? filter.toLocaleLowerCase() : null;

        //filter all the properties of the User by the filter string passed in the pipe
        return filter ? value.filter((app: IUser) =>
            app.FirstName != null && app.FirstName.toLocaleLowerCase().indexOf(filter) != -1
            || app.LastName != null && app.LastName.toLocaleLowerCase().indexOf(filter) != -1
            || app.Gender != null && app.Gender.toLocaleLowerCase().indexOf(filter) != -1

        ) : value;

    }
}