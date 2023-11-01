import { Component } from '@angular/core';

interface Home {
  currentBanner: number,
  nextBanner(): void,
  perviousBanner(): void
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements Home {

  currentBanner: number = 1;

  nextBanner(): void {
    this.currentBanner += 1;
    if (this.currentBanner > 3) {
      this.currentBanner = 1;
    }
    console.log(this.currentBanner);
  };

  perviousBanner(): void {
    this.currentBanner -= 1;
    if (this.currentBanner < 1) {
      this.currentBanner = 3;
    }
    console.log(this.currentBanner);
  };

}
