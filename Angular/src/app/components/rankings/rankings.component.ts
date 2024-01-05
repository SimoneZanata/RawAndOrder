import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { User } from 'src/app/models/user';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';
import { RankingsService } from 'src/app/services/rankings.service';

@Injectable({
  providedIn: "root",
})

@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnChanges {

  @Input() users: User[] =[];
  sortKey = 'points';
  sortDesc = false;
  

  constructor(private rankingsService: RankingsService) {}

  ngOnChanges(): void {
    this.sortDesc = false;
    this.sortUsers();
  }

  sortUsers() {
    this.sortDesc = !this.sortDesc;
    this.users = this.users?.sort((b: any, a: any) => {
      return (this.sortDesc ? -1 : 1) * (Number(b.points) - Number(a.points));
    });
  }    
}  
