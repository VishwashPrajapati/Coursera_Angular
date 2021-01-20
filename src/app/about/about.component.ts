import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
leader:Leader[];
  constructor(private leaderservice:LeaderService) { }

  ngOnInit(): void {
    this.leaderservice.getLeaderData()
    .then((leader)=>this.leader = leader);
  }

}
