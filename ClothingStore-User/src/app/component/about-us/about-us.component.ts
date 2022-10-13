import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/services/aboutus.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
 allMember:any
  constructor( private aboutusService :AboutusService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData()
  {
    this.aboutusService.getAllAdmin().subscribe(res=>{
       this.allMember=res
      this.allMember=this.allMember.data
      
    })
  }

}
