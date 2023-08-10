import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/helpers/auth-guard";
import { LoginComponent } from "./@shared/components/login/login.component";
import { RegisterComponent } from "./@shared/components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { GameSessionComponent } from './components/game-section/game-session/game-session.component';
import { GameResultsComponent } from "./components/game-section/game-results/game-results.component";
import { GameResultsItemDetailsComponent } from "./components/game-section/game-results-item-details/game-results-item-details.component";
import { ReviewsMainComponent } from "./components/reviews-movies/reviews-main/reviews-main.component";

import { ReviewsItemDetailsComponent } from "./components/reviews-movies/reviews-item-details/reviews-item-details.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { PageReviewsComponent } from "./components/reviews-movies/page-reviews/page-reviews.component";
import { PageGameResultsItemDetailsComponent } from "./components/game-section/page-game-results-item-details/page-game-results-item-details.component";
//import { PageGameComponent } from "./page-game/page-game.component";


const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "welcome", component: WelcomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "rankings", component: RankingsComponent },
      { path: "game", component: GameSessionComponent },
      { path: "result", component: GameResultsComponent },
      { path: "movie/:movieId", component: PageGameResultsItemDetailsComponent },
      { path: "reviews", component: PageReviewsComponent },
      { path: "edit-profile", component: EditProfileComponent },
      { path: "reviews/:id/:movieId", component: ReviewsItemDetailsComponent },
      { path: "", redirectTo: "welcome", pathMatch: 'full' },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
