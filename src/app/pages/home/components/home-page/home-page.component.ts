import { ChangeDetectionStrategy, Component } from '@angular/core';

type HeroSectionCarouselItem = {
  text: string;
  subtext: string;
  image: string;
  isReversed?: boolean;
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  carouselItems: HeroSectionCarouselItem[] = [
    {
      text: 'Добро пожаловать в Мир Финансов!',
      subtext:
        'Мы - ваш надежный партнер в достижении финансового благополучия. Наше приложение предлагает удобные и интуитивно понятные инструменты для управления вашими финансами. Откройте для себя мир возможностей с нами.',
      image: '../../../../../assets/images/home-carousel-1.jpeg',
    },
    {
      text: 'Защита Ваших Интересов',
      subtext:
        'Мы ценим вашу конфиденциальность и гарантируем высочайший уровень защиты данных и инвестиций.',
      image: '../../../../../assets/images/home-carousel-2.png',
    },
    {
      text: 'Технологии Будущего',
      subtext:
        'Присоединяйтесь к нам, чтобы быть на шаг впереди с нашими инновационными и передовыми финансовыми решениями.',
      image: '../../../../../assets/images/home-carousel-3.jpeg',
    },
  ];

  public constructor() {
    this.carouselItems.forEach((item, index) => {
      const curItem = item;
      curItem.isReversed = index % 2 === 0;
    });
  }
}
