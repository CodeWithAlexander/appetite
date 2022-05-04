import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'posts',
        loadChildren: () => import('../posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: 'favourite',
        loadChildren: () => import('../favourite/favourite.module').then(m => m.FavouritePageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../add/add.module').then(m => m.AddPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/posts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/posts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
