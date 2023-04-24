import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  // private selectedFile:any


  // constructor(private http: HttpClient) { }


  // onFileSelected(event:any): void {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile)
  // }


  // onUpload(){
  //   const formData = new FormData();
  //   formData.append('audio', this.selectedFile);
  //   console.log(FormData)
  //   this.http.post('http://localhost:3000/api/audio',formData,)
  //   .subscribe(res => {
  //           console.log(res);
  //         });
  // }
  // ngOnInit(): void {
  // }

}
