import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonService } from './services/person.service';
import { HttpClientModule } from '@angular/common/http'; 
import { NgxDatatableModule } from 'node_modules/@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatDialogModule,
   ReactiveFormsModule,
   BrowserAnimationsModule
  ],
  providers: [PersonService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
