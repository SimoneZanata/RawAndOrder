import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/helpers/auth-guard";
import { LoginComponent } from "./@shared/components/login/login.component";
import { RegisterComponent } from "./@shared/components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { GameResultsComponent } from "./components/game-section/game-results/game-results.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { PageReviewsComponent } from "./components/page-components/page-reviews/page-reviews.component";
import { PageGameResultsItemDetailsComponent } from "./components/game-section/page-game-results-item-details/page-game-results-item-details.component";
import { PageGameSessionComponent } from "./components/page-components/page-game-session/page-game-session.component";
import { PageReviewItemDetailsComponent } from "./components/page-components/page-review-item-details/page-review-item-details.component";
import { PageRankingsComponent } from "./components/page-components/page-rankings/page-rankings.component";



const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "welcome", component: WelcomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "rankings", component: PageRankingsComponent },
      { path: "game", component: PageGameSessionComponent },
      { path: "result", component: GameResultsComponent },
      { path: "movie/:movieId", component: PageGameResultsItemDetailsComponent },
      { path: "reviews", component: PageReviewsComponent },
      { path: "edit-profile", component: EditProfileComponent },
      { path: "reviews/:id/:movieId", component:PageReviewItemDetailsComponent },
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
