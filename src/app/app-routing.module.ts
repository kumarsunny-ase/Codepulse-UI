import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { AddDetailsComponent } from './features/category/add-details/add-details.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent,
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
  },
  {
    path: 'admin/categories/details',
    component: AddDetailsComponent,
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent,
  },
  {
    path: 'admin/blogposts/admin/blogposts/add',
    component: AddBlogpostComponent,
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
