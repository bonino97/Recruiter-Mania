import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() avatar: boolean = false;
  @Input() default: boolean = false;
  @Input() image: string;
  user: any;
  userImage: any;
  file: any = {};
  imagePreviewUrl: any = {};
  profilePathURL = `${environment.uploadsUrl}/Profiles/`;

  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(private _LayoutService: LayoutService, public router: Router) {
    this.handleImageChange = this.handleImageChange.bind(this);
    
  }

  ngOnInit() {
    
    this._LayoutService.GetUserInstance()
    .subscribe((data:any) => {
      console.log(data);
      this.user = data.data;
      this.userImage = this.user.Image;
      this.file = null;
      
      if(!!this.userImage){
        this.imagePreviewUrl = `${this.profilePathURL}${this.userImage}`; 
      } else {
        this.imagePreviewUrl = "assets/img/placeholder.jpg";
      }

    }, (error: any) => {
      if(error.status === 401){
        swal.fire({
          html: `<span style='color:grey'> ${error.error.msg} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
        this.router.navigate([`/login`]);
      }
    });


  }

  handleImageChange($event) {
    $event.preventDefault();
    let reader = new FileReader();
    let file = $event.target.files[0];
    reader.onloadend = () => {
      this.file = file;
      this.imagePreviewUrl = reader.result;
      // this.state.imagePreviewUrl1 = reader.result;
    };
    reader.readAsDataURL(file);
  }

  handleClick() {
    this.fileInput.nativeElement.click();
  }

  handleRemove() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
        ? "assets/img/placeholder.jpg"
        : "assets/img/image_placeholder.jpg";
    this.fileInput.nativeElement.value = null;
  }

  handleSubmit($event) {
    $event.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  
  uploadImage(){
    const formData = new FormData();
    formData.append('Image', this.file);
    
    this._LayoutService.UploadAvatar(formData).subscribe((data:any) => {
      
      if(data.success == true){
        return swal.fire({
          html: `<span style='color:grey'> ${data.message} <span>`,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff',
          timer: 1500
        });
      }

      if(data.success == false) {
        return swal.fire({
          html: `<span style='color:grey'> We cannot upload your image, verify the format... <span>`,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff',
          timer: 1500
        });
      }

    }, (error:any) => {
      console.log(error);
      if(error.success == false){
        return swal.fire({
          html: `<span style='color:grey'> ${error.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }

      if(error.error.success == false){
        return swal.fire({
          html: `<span style='color:grey'> ${error.error.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }

      if(error.error.error.success == false){
        return swal.fire({
          html: `<span style='color:grey'> ${error.error.error.message} <span>`,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger btn-simple",
          background: '#ffffff'
        });
      }

      return swal.fire({
        html: `<span style='color:grey'> Something wrong... <span>`,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger btn-simple",
        background: '#ffffff'
      });
    }) 
  }

}
