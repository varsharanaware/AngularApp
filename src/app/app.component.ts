import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PersonService } from './services/person.service'
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('buttonsTemplate', { static: true }) buttonsTemplate: TemplateRef<any> | undefined;
  title = 'BasicCrud';
  persons: any;
  loadingIndicator = true;
  reorderable = true;
  columns : any;
  isAdd = true;

  ngOnInit() {
    this.columns = [
      { prop: 'EmpId', name:'Employee ID' }, 
      { prop: 'EmpName' }, 
      { prop: 'DOB' }, 
      { prop: 'EmailId' }, 
      { prop: 'Gender' },
      { prop: 'Address' },
      { name:'Action', cellTemplate: this.buttonsTemplate}
    ];

    this.personAddForm = this.formBuilder.group({
      EmpId: ['0'],
      EmpName: ['', Validators.required],
      DOB: ['', Validators.required],
      Gender: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }
  

  personAddForm: FormGroup = new FormGroup({
    EmpId: new FormControl(0),
    EmpName: new FormControl(''),
    DOB: new FormControl(''),
    EmailId: new FormControl(''),
    Gender: new FormControl(''),
    Address: new FormControl(''),
  
   
  });

  constructor(private personService : PersonService,public dialog: MatDialog, private formBuilder: FormBuilder){  
    this.GetAllPersonData();
  } 

  GetAllPersonData(){
    this.personService.GetAllEmployees().subscribe(result => {
        this.persons = result;
    });
  }

 

  AddEmployee(){
    this.isAdd = true; 
    var personData = this.personAddForm.getRawValue();
    debugger
    // if(personData.Gender=='false')
    // {
    //   personData.Gender='Female';
    // }
    // else
    // {
    //   personData.Gender='Male';
    // }
    this.personService.AddEmployee(personData).subscribe(result => {
      this.GetAllPersonData();
      this.EmptyFormControls();
    });
  }

  AddNewRecord(){
    this.isAdd = true; //showing Add button and hiding update button
    this.EmptyFormControls();
  }

  // EmpId,EmpName,DOB,Gender,EmailId,Address
  EmptyFormControls(){
    this.personAddForm.controls['EmpId'].setValue(0);
    this.personAddForm.controls['EmpName'].setValue("");
    this.personAddForm.controls['DOB'].setValue("");
    this.personAddForm.controls['Gender'].setValue("");
    this.personAddForm.controls['EmailId'].setValue("");
    this.personAddForm.controls['Address'].setValue("");
  }

  onEdit(row: any){
    this.isAdd = false; //hiding Add button to show update button
    this.personAddForm.controls['EmpId'].setValue(row.EmpId);
    this.personAddForm.controls['EmpName'].setValue(row.EmpName);
    this.personAddForm.controls['DOB'].setValue(row.DOB);
    if(row.Gender=="Male"){
      this.personAddForm.controls['Gender'].setValue(true);
    }else if(row.Gender=="Female"){
      this.personAddForm.controls['Gender'].setValue(false);
    }
    this.personAddForm.controls['EmailId'].setValue(row.EmailId);
    this.personAddForm.controls['Address'].setValue(row.Address);
  }

  onDelete(row:any){
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="Yes"){
        this.personService.DeleteEmployee(row.EmpId).subscribe(result => {
          this.GetAllPersonData();
          this.EmptyFormControls();
        });
      }
    });
  }
}
