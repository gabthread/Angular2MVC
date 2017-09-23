/*
 - We are importing Components, OnInit (to use OnInit event), ViewChild (to access Modal pop up properties).

- In UserComponent we are going to use Reactive (Model-driven) forms that I found way more organized and easy to use
 than template driven forms. To me, it looks like a strongly type ASP.NET MVC razor view, it is also good for unit
 testing. The form fields, validations and validation errors can be managed on TypeScript side and HTML view has minimum
 form logic that is good practice to keep the code at one place.

*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../service/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

//Third Party Component to manage popups
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

//Since User is a parent component and we will not use it in any other component, we are not specifying the Selector property
@Component({
    templateUrl: 'app/Components/user.component.html'
})
export class UserComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent; //the modal is placeholder for Modal pop up component that we will create in HTML template. This is the syntax if you want to access any HTML element in TypeScript. :ModalComponent specify the type of element.
    users: IUser[];
    user: IUser;
    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;

    constructor(private fb: FormBuilder, private _userService: UserService) { }

    ngOnInit(): void {

        //We are initializing the User form, specifying the form elements and validation rules. Right now form is initialized with empty string
        this.userFrm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: [''],
            Gender: ['']
        });

        this.LoadUsers();

    }

    /**
     Subscribe is the part of Observable that we discussed in previous steps.Once the user loads would be complete,
     it will save it in users variable.In case of any error, error message would be saved in msg variable.indLoading is
     the Boolean variable we are using here to show loading message until full response would be loaded.
    */
    LoadUsers(): void {


        this.indLoading = true;
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.indLoading = false; },
            //error => this.msg = <any>error
            );

    }

    /*
    These 3 methods are resembling so let’s take AddUser method and understand it. First, we are storing current DB operation
     in dpops variable that is of DBOperation enumeration type. Next, we are calling SetControlsState method that will enable
     or disable form controls. Next variables are setting the modal pop up heading and button title. In only AddUser function,
     we are resetting form to clearing the form. Next, we are calling modal.open() function to view the modal pop up.
     In edit and delete user method, we are getting UserID as parameter, calling the Observable’s filter method to get
     single user from users list. The filter syntax is like anonymous method in C#. the next line is to assign the single
     user to user form that will set the value to the front end, piece of cake.
    */
    addUser() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    }

    editUser(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }

    deleteUser(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }
    //////////////////////////////////////////////

    //enable or disable the form
    SetControlsState(isEnable: boolean) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }


    //get the form values and based on DBOperation enumeration value, it performs add, update and delete operation.
    //Once we submit the form, it sends all the values that we can get through .value property.
    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._userService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;
    }

}

