import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './@shared/components/login/login.component';
import { LogoutComponent } from './@shared/components/logout/logout.component';
import { RegisterComponent } from './@shared/components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './@shared/modules/angular-material/angular-material.module';
import { GameSessionComponent } from './components/game-section/game-session/game-session.component';
import { CdkDrag, CdkDragPreview, CdkDropList } from '@angular/cdk/drag-drop';
import { GameResultsComponent } from './components/game-section/game-results/game-results.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameResultsItemComponent } from './components/game-section/game-results-item/game-results-item.component';
import { GameResultsItemDetailsComponent } from './components/game-section/game-results-item-details/game-results-item-details.component';
import { ReviewsMainComponent } from './components/reviews-movies/reviews-main/reviews-main.component';
import { ReviewsItemComponent } from './components/reviews-movies/reviews-item/reviews-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { ReviewsItemDetailsComponent } from './components/reviews-movies/reviews-item-details/reviews-item-details.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PageReviewsComponent } from './components/page-components/page-reviews/page-reviews.component';
import { PageGameResultsItemDetailsComponent } from './components/page-components/page-game-results-item-details/page-game-results-item-details.component';
import { PageGameSessionComponent } from './components/page-components/page-game-session/page-game-session.component';
import { PageReviewItemDetailsComponent } from './components/page-components/page-review-item-details/page-review-item-details.component';
import { PageRankingsComponent } from './components/page-components/page-rankings/page-rankings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    LogoutComponent,
    NavbarComponent,
    WelcomeComponent,
    HeroComponent,
    ProfileComponent,
    RankingsComponent,
    FooterComponent,
    RankingsComponent,
    GameSessionComponent,
    GameResultsComponent,
    GameResultsItemComponent,
    GameResultsItemDetailsComponent,
    ReviewsMainComponent,
    ReviewsItemComponent,
    ReviewsItemDetailsComponent,
    EditProfileComponent,
    PageReviewsComponent,
    PageGameResultsItemDetailsComponent,
    PageGameSessionComponent,
    PageReviewItemDetailsComponent,
    PageRankingsComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CdkDropList,
    CdkDrag,
    CdkDragPreview,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
