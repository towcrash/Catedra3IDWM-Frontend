import { inject, Injectable } from '@angular/core';
import { ResponseApiPosts } from '../Interfaces/ResponseApiGetPosts';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = "http://localhost:5144/api/Post";
  public errors: string[] =[];
  private http = inject(HttpClient);
  
  
  async GetAllPosts(): Promise<ResponseApiPosts[]> {
    try {
      const response = await firstValueFrom(
      this.http.get<ResponseApiPosts[]>(`${this.baseUrl}`)
      );
      return Promise.resolve(response);
    } catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  async CreatePost(formData: FormData): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}`, formData)
      );
      return response;
    } catch (error) {
      console.error('Error creando el post:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene los errores.
   * @returns Una lista de errores.
   */
  getErrors(): string[] {
    return this.errors;
  }
}
