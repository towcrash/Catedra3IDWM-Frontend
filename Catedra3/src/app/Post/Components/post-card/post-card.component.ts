import { Component, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post: any;
  
  private LSservice = inject(LocalStorageService);

  constructor() {
    this.post = {
      id: '',
      title:     '',
      publishDate: '',
      imageUrl: ''
    }
  }
}
