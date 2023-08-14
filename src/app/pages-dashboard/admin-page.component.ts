import { Component } from '@angular/core';

@Component({
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  getImgSrc(): string {
    const isBrightTheme = document.body.classList.contains('light-theme');
    return isBrightTheme
      ? '../../../assets/admin-section/effect-onlight.png'
      : '../../../assets/admin-section/effect-ondark.png';
  }
}
