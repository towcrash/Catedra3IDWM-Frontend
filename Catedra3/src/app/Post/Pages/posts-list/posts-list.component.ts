import { Component, inject } from '@angular/core';
import { ResponseApiPosts } from '../../Interfaces/ResponseApiGetPosts';
import { PostService } from '../../Services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';
import { Router } from '@angular/router';
import { PostCardComponent } from "../../Components/post-card/post-card.component";

@Component({
  selector: 'app-posts-list',
  imports: [CommonModule, FormsModule, NavbarComponent, PostCardComponent],
  providers: [PostService],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {
  postArray: ResponseApiPosts[] = [];
  filteredArray: ResponseApiPosts[] = [];
  currentPage: number = 1; // Página actual
  pageSize: number = 10; // Cantidad máxima por página
  totalPages: number = 1; // Total de páginas

  isLoading: boolean = false;
  errorMessage: string = '';


  private productService = inject(PostService);


  /**
   * Inicializa el componente obteniendo los productos.
   */
  ngOnInit(): void 
  {
    this.ObtenerPosts();
  }

  constructor(private router: Router) {}

  /**
   * Obtiene todos los productos del servicio y los almacena en el array de productos.
   */
  ObtenerPosts() 
  {
    console.log('Obteniendo posts...');
    this.productService
      .GetAllPosts()
      .then((posts) => {
        for (let i = 0; i < posts.length; i++) {
          console.log('Añadiendo:', posts[i]);
          this.postArray.push(posts[i]);
        }
        this.totalPages = Math.ceil(this.postArray.length / this.pageSize);

        this.paginate();

        console.log('Productos obtenidos:', this.postArray);
      })
      .catch((error) => {
        console.log('Error al obtener productos:', error);
      });
    this.filteredArray = this.postArray;
    return;
  }

  


  

  /**
   * Pagina los productos según la página actual y el tamaño de página.
   */
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredArray = this.postArray.slice(startIndex, endIndex);
  }

  /**
   * Cambia a la página especificada.
   * @param page - Número de la página a la que se desea ir.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }
}
