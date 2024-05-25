import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { TabMenuModule } from 'primeng/tabmenu';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';

import routes from './home.routes';
import { HomeEntryComponent } from './components/home-entry/home-entry.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeCurrenciesSectionComponent } from './components/home-page/home-currencies-section/home-currencies-section.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeDiversificationSectionComponent } from './components/home-page/home-diversification-section/home-diversification-section.component';
import { HomeHeroSectionComponent } from './components/home-page/home-hero-section/home-hero-section.component';
import { TextBlockComponent } from '../../shared/components/text-block/text-block.component';
import { CurrenciesMenuComponent } from './components/home-page/home-currencies-section/currencies-menu/currencies-menu.component';
import { CurrenciesChartComponent } from './components/home-page/home-currencies-section/currencies-chart/currencies-chart.component';
import { RelativeCurrencySelectComponent } from './components/home-page/home-currencies-section/relative-currency-select/relative-currency-select.component';

@NgModule({
  declarations: [
    HomeEntryComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HomeHeroSectionComponent,
    HomeDiversificationSectionComponent,
    HomeCurrenciesSectionComponent,
    CurrenciesMenuComponent,
    CurrenciesChartComponent,
    RelativeCurrencySelectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MenubarModule,
    ButtonModule,
    RippleModule,
    CarouselModule,
    ChartModule,
    TabMenuModule,
    ScrollTopModule,
    DropdownModule,
    TextBlockComponent,
  ],
})
export class HomeModule {}
