import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { updateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostByIdSubscription?: Subscription;
  deletePostByIdSubscription?: Subscription;
  imageSubscription?: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private blogPostApi: BlogPostService,
    private categoryApi: CategoryService,
    private router: Router,
    private imageApi: ImageService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryApi.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost From API
        if (this.id) {
          this.getBlogPostByIdSubscription = this.blogPostApi
            .getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategories = response.categories.map((x) => x.id);
              },
            });
        }

       this.imageSubscription = this.imageApi.onSelectImage()
        .subscribe({
          next: (response) => {
            if(this.model) {
              this.model.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })
      },
    });
  }

  onFormSubmit(): void {
    // Convert model to request object
    if (this.model && this.id) {
      var updateBlogPost: updateBlogPost = {
        title: this.model.title,
        author: this.model.author,
        content: this.model.content,
        publishedDate: this.model.publishedDate,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? [],
      };
      this.updateBlogPostSubscription = this.blogPostApi
        .updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }

  OnDelete(): void {
    if (this.id) {
      this.deletePostByIdSubscription = this.blogPostApi
        .DeleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostByIdSubscription?.unsubscribe();
    this.deletePostByIdSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }
}
