import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';
import { Endpoints } from '../../../shared/enums/endpoints';

export const pairErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);
  return next(req).pipe(
    map((event) => {
      if (
        event instanceof HttpResponse &&
        event.url?.endsWith(Endpoints.Trades) &&
        !Object.keys(event.body as object).length
      ) {
        messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось загрузить данные о паре валют.',
        });
        throw Error('Не удалось загрузить данные о паре валют.');
      }
      return event;
    }),
  );
};
