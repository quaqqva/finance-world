import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

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
  public carouselItems: HeroSectionCarouselItem[] = [
    {
      text: 'Добро пожаловать в Мир Финансов!',
      subtext:
        'Мы - ваш надежный партнер в достижении финансового благополучия. Наше приложение предлагает удобные и интуитивно понятные инструменты для управления вашими финансами. Откройте для себя мир возможностей с нами.',
      image: '../../../../../assets/images/home-page/bank.jpeg',
    },
    {
      text: 'Защита Ваших Интересов',
      subtext:
        'Мы ценим вашу конфиденциальность и гарантируем высочайший уровень защиты данных и инвестиций.',
      image: '../../../../../assets/images/home-page/piggy-bank.svg',
    },
    {
      text: 'Технологии Будущего',
      subtext:
        'Присоединяйтесь к нам, чтобы быть на шаг впереди с нашими инновационными и передовыми финансовыми решениями.',
      image: '../../../../../assets/images/home-page/calculator.jpeg',
    },
  ];

  public currenciesMenuItems: MenuItem[] = [
    {
      icon: PrimeIcons.BITCOIN,
      label: 'BTC',
    },
    {
      icon: 'pi pi-ethereum',
      label: 'ETH',
    },
  ];

  public activeCurrency?: MenuItem;

  public constructor() {
    this.carouselItems.forEach((item, index) => {
      const curItem = item;
      curItem.isReversed = index % 2 === 0;
    });
  }
}
