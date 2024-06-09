import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RelativeCurrency } from '../models/relative-currencies.enum';

@Injectable({
  providedIn: 'root',
})
export class PriceDifferenceService {
  private lastPrice: number = 0;

  private relativeCurrency: RelativeCurrency = RelativeCurrency.USDT;

  public set lastCurrencyPrice(value: number) {
    if (this.lastPrice !== value) {
      this.messageService.add({
        severity: 'info',
        summary: `Стоимость валюты изменилась с ${this.lastPrice} до ${value} ${this.relativeCurrency}!`,
      });
    }
    this.lastPrice = value;
  }

  public set relativeCurrencyValue(value: RelativeCurrency) {
    if (this.relativeCurrency !== value) {
      this.messageService.add({
        severity: 'info',
        summary: `Валюта изменилась с ${this.relativeCurrency} до ${value}!`,
      });
    }
    this.relativeCurrency = value;
  }

  constructor(private messageService: MessageService) {}
}
