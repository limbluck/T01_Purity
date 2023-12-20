import { trigger, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from "rxjs";
import { bannerAnimations } from 'src/app/animations/banner.animation';

/**
 * 
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    bannerAnimations.bannerElementAnimation,
    bannerAnimations.bannerContainerAnimation,
    bannerAnimations.bannerBackgroundAnimation
  ]
})
export class HomeComponent {

  constructor (private readonly cdref: ChangeDetectorRef) {}

  // #region Banner

    bannerCurrent: number = 1;
    readonly bannerSwipeCancel = new Subject<undefined>()
    bannerSwipe(distance: {x: number, y: number}) {
      if (distance.x > 200) {this.bannerPervious(); this.bannerSwipeCancel.next(undefined)}
      if (distance.x < -200) {this.bannerNext(); this.bannerSwipeCancel.next(undefined)}
    }

    bannerPervious() {
      --this.bannerCurrent < 1
        ? this.bannerCurrent = 3
        : this.bannerCurrent;
      this.bannerSwitch()
    }

    bannerNext() {
      ++this.bannerCurrent > 3
      ? this.bannerCurrent = 1
      : this.bannerCurrent;
      this.bannerSwitch()
    }

    banner1stItemStatus: string = 'shown';
    banner2ndItemStatus: string = 'hidden';
    banner3rdItemStatus: string = 'hidden';
    bannerSwitch() {
      switch (this.bannerCurrent) {
        case(1):
          this.banner1stItemStatus = 'shown';
          this.banner2ndItemStatus = 'hidden';
          this.banner3rdItemStatus = 'hidden';
          break
        case(2):
          this.banner1stItemStatus = 'hidden';
          this.banner2ndItemStatus = 'shown';
          this.banner3rdItemStatus = 'hidden';
          break
        case(3):
          this.banner1stItemStatus = 'hidden';
          this.banner2ndItemStatus = 'hidden';
          this.banner3rdItemStatus = 'shown';
          break
        default:
          throw new Error("Unexpected value of 'this.bannerCurrent' in bannerSwitch() function")
      }
    }

  // #endregion
  
  // #region Teachers

    teachersSwipeDistance: number = 0;
    teachersSwipeActive: boolean = false;
    teachersSwipeStart() {
      this.teachersSwipeActive = true;
    }
    teachersSwipeMove(value: {x: number, y: number}) {
      this.teachersSwipeDistance = value.x;
    }
    teachersSwipeEnd() {
      this.teachersSwipeActive = false;
    }

    teachersPage: number = 1;
    teachersPageDecrease() {
      this.teachersPage = this.teachersPageRecieved;
      this.cdref.detectChanges();
      this.teachersPage--;
    }
    teachersPageIncrease() {
      this.teachersPage = this.teachersPageRecieved;
      this.cdref.detectChanges();
      this.teachersPage++;
    }
    teachersSetPage(pageNumber: number) {
      this.teachersPage = this.teachersPageRecieved;
      this.cdref.detectChanges();
      this.teachersPage = pageNumber;
    }

    teachersPageRecieved: number = 1;
    teachersRecievePage(recievedPage: number) {
      this.teachersPageRecieved = recievedPage;
    }

  // #endregion

  // #region Reviews

    reviewsSwipeDistance: number = 0;
    reviewsSwipeActive: boolean = false;
    reviewsSwipeStart() {
      this.reviewsSwipeActive = true;
    }
    reviewsSwipeMove(value: {x: number, y: number}) {
      this.reviewsSwipeDistance = value.x;
    }
    reviewsSwipeEnd() {
      this.reviewsSwipeActive = false;
      this.reviewsPage = this.reviewsPageRecieved;
    }
    
    reviewsSetPage(pageNumber: number) {
      this.reviewsPage = this.reviewsPageRecieved;
      this.cdref.detectChanges();
      this.reviewsPage = pageNumber;
    }

    reviewsPage: number = 1;

    reviewsPageRecieved: number = 1;
    reviewsRecievePage(recievedPage: number) {
      this.reviewsPageRecieved = recievedPage;
    }

  // #endregion

  // #region Blogs

    blogsSwipeDistance: number = 0;
    blogsSwipeActive: boolean = false;
    blogsSwipeStart() {
      this.blogsSwipeActive = true;
    }
    blogsSwipeMove(value: {x: number, y: number}) {
      this.blogsSwipeDistance = value.x;
    }
    blogsSwipeEnd() {
      this.blogsSwipeActive = false;
    }

    blogsPage: number = 1;
    blogsPageDecrease() {
      this.blogsPage = this.blogsPageRecieved;
      this.cdref.detectChanges();
      this.blogsPage--;
    }
    blogsPageIncrease() {
      this.blogsPage = this.blogsPageRecieved;
      this.cdref.detectChanges();
      this.blogsPage++;
    }

    blogsPageRecieved: number = 1;
    blogsRecievePage(recievedPage: number) {
      this.blogsPageRecieved = recievedPage;
    }

  // #endregion

  // #region Clients

    clientsSwipeDistance: number = 0;
    clientsSwipeActive: boolean = false;
    clientsSwipeStart() {
      this.clientsSwipeActive = true;
    }
    clientsSwipeMove(value: {x: number, y: number}) {
      this.clientsSwipeDistance = value.x;
    }
    clientsSwipeEnd() {
      this.clientsSwipeActive = false;
    }

    clientsPage: number = 1;
    clientsPageDecrease() {
      this.clientsPage = this.clientsPageRecieved;
      this.cdref.detectChanges();
      this.clientsPage--;
    }
    clientsPageIncrease() {
      this.clientsPage = this.clientsPageRecieved;
      this.cdref.detectChanges();
      this.clientsPage++;
    }

    clientsPageRecieved: number = 1;
    clientsRecievePage(recievedPage: number) {
      this.clientsPageRecieved = recievedPage;
    }

// #endregion
}
