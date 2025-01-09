import { Component, inject, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImgDropComponent } from '../../../images/img-drop/img-drop.component';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, CommonModule, ImgDropComponent],
  providers: [LocalStorageService],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  @ViewChild(ImgDropComponent) imgDrop!: ImgDropComponent;
  postForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  selectedFile: File | null = null;
  postService = inject(PostService);
  localStorageService = inject(LocalStorageService);

  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  /**
   * Valida si el campo 'name' es inválido y ha sido tocado.
   */
  get titleValidate() 
  {
    return this.postForm.get('title')?.invalid && this.postForm.get('title')?.touched;
  }

  /**
   * Maneja la selección de un archivo.
   * @param file El archivo seleccionado.
   */
  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  /**
   * Envía el formulario para crear un nuevo producto.
   */
  async submit() {
    if (this.postForm.invalid || !this.selectedFile) return;

    try {
      const formData = new FormData();
      formData.append('title', this.postForm.value.title);
      formData.append('image', this.selectedFile); // Add the file
      

      const response = await this.postService.CreatePost(formData);

      if (response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Post registrado: ', response);
        alert("Post creado con éxito");
        this.postForm.reset();
      } else {
        this.error = true;
        this.errorMessage = this.postService.getErrors();
      }
    } catch (error: any) {
      console.error('Error en OnSubmit', error);
      this.error = true;
      this.errorMessage.push(error.error);
    }
  }
}
