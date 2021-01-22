import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  

  constructor(public http: HttpClient) { 
    console.log('Hello from service');
  }

  GetAllPersons(){  
      return this.http.get('https://localhost:44389/Api/Employee/AllEmployeeDetails');
  }  

  AddPerson(person: any){
    return this.http.post('https://localhost:44338/api/People',person);
  }
    
  DeletePerson(id: any){
    return this.http.delete('https://localhost:44338/api/People/'+id);
  }

  GetAllEmployees(){  
    return this.http.get('https://localhost:44389/Api/Employee/AllEmployeeDetails');
}  

AddEmployee(person: any){
  return this.http.post('https://localhost:44389/Api/Employee/InsertEmployeeDetails',person);
}
  
DeleteEmployee(id: any){
  return this.http.delete('https://localhost:44389/Api/Employee/DeleteEmployeeDetails/'+id);
}
}
