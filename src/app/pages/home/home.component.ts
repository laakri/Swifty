import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  movingTexts: string[] = Array(25).fill('SHOP NOW');

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '800px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.startAnimationLoop();
  }
  startAnimationLoop() {
    const bannerContainer = document.querySelector(
      '.banner-container'
    ) as HTMLElement;
    const movingTextsContainer = document.querySelector(
      '.moving-texts'
    ) as HTMLElement;
    const containerWidth = bannerContainer.offsetWidth;

    let offset = containerWidth;

    // Loop the animation
    setInterval(() => {
      offset -= 1; // Adjust the speed of movement here
      if (offset < -movingTextsContainer.offsetWidth) {
        offset = containerWidth;
      }
      movingTextsContainer.style.transform = `translateX(${offset}px)`;
    }, 10); // Adjust the interval as needed
  }
  carouselItems = [
    {
      image: '../../../assets/homepage/bw1.jpg',
    },
    {
      image: '../../../assets/homepage/bw2.jpg',
    },
    {
      image: '../../../assets/homepage/bw4.jpg',
    },
    {
      image: '../../../assets/homepage/bw3.jpg',
    },
  ];
  giftsForMen: any[] = [
    {
      image: '../../../assets/homepage/bw2.jpg',
      title: 'Category Title',
      description: "People's Choice",
    },
    {
      image: '../../../assets/homepage/bw2.jpg',
      title: 'Category Title',
      description: 'Always Warm',
    },
    {
      image: '../../../assets/homepage/bw2.jpg',
      title: 'Category Title',
      description: 'Best Price',
    },
  ];

  giftsForWomen: any[] = [
    {
      image: '../../../assets/homepage/mockup white t-shirt-Front.jpg',
      title: 'Category Title',
      description: "People's Choice",
    },
    {
      image:
        '../../../assets/homepage/front-view-modern-dark-sunglasses-orange-black.jpg',
      title: 'Category Title',
      description: 'Always Warm',
    },
    {
      image:
        '../../../assets/homepage/beautiful-elegance-luxury-fashion-green-handbag.jpg',
      title: 'Category Title',
      description: 'Best Price',
    },
  ];
}
