import { Injectable } from '@angular/core';

interface IProvidedService {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProvidedServicesService {
  constructor() {}

  items: IProvidedService[] = [
    {
      name: 'Покраска',
      description:
        'Технология, результатом которой является сформированное прочное лако-красочное покрытие на поверхности твёрдых материалов',
    },
    {
      name: 'Малярка',
      description:
        'Работы, связанные с отделкой внутренних и наружных поверхностей здания или сооружения различными окрасочными составами',
    },
    {
      name: 'Теплый пол',
      description:
        'Cистема отопления, обеспечивающая подогрев полов в помещении. Это современный и удобный способ отопления жилого помещения или дома в любое время года',
    },
    {
      name: 'Возведение стен',
      description:
        'Cтроительный процесс в ходе которого создается стеновая конструкция, обладающая проектными характеристиками и соответствующая государственным строительным нормам и правилам',
    },
    {
      name: 'Штукатурка',
      description:
        'Отделочный слой, который наносится строительным раствором, затвердевающим и дающим ровную прочную поверхность. Её наносят на стены, потолки, колонны и другие поверхности',
    },
    {
      name: 'Клининг',
      description:
        'Профессиональная уборка разного рода помещений и территорий, при которой необходимо соблюдать специальные стандарты. Проводится уборка опытными специалистами, которые используют специальное оборудование и расходные материалы',
    },
    {
      name: 'Установка дверей',
      description:
        'Сложный кропотливый процесс, требующий аккуратности и терпения. Чтобы монтаж, начиная от навески петель и заканчивая установкой короба в проем',
    },
  ];
}
