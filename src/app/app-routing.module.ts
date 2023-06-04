import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: "", component: AboutComponent},
  {path: "about", component: AboutComponent},
  {path: "chat", component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
