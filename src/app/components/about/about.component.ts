import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  title = 'my-app';
  isPhoneviewed = false;

  constructor(public responsive: BreakpointObserver) { }


  ngOnInit(): void {
    window.scrollTo(0, 0);


    // this.responsive
    //   .observe([Breakpoints.HandsetPortrait])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       console.log(
    //         'This is the Handset Portrait point at max-width: 599.98 px and portrait orientation.'
    //       );
    //     }
    //   });


    this.responsive.observe(Breakpoints.HandsetPortrait)
    .subscribe(result => {
    
    this.isPhoneviewed = false;
    
    if (result.matches) {
    this.isPhoneviewed = true;
    } {
    console.log(
    'HandsetPortrait is on'
    );
    }
    
    });


  }

}
