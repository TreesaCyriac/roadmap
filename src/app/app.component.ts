import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'roadmap';

  @ViewChild('elementRef', { static: true }) elementRef: ElementRef;

  ngOnIit() {}

  ngAfterViewInit() {
    window.addEventListener(
      'load',
      function () {
        const days = document.querySelectorAll('.chart-values li');
        const tasks = document.querySelectorAll('.chart-bars li');
        const daysArray = [...Array.from(days)];

        tasks.forEach((el) => {
          if (el instanceof HTMLElement) {
            const duration = el.dataset.duration.split('-');
            const startDay = duration[0];
            const endDay = duration[1];
            let left = 0,
              width = 0;

            if (startDay.endsWith('½')) {
              const filteredArray = daysArray.filter(
                (day) => day.textContent == startDay.slice(0, -1)
              );
              left = (<HTMLElement>filteredArray[0]).offsetLeft +
                    (<HTMLElement>filteredArray[0]).offsetWidth / 2;
            } else {
              const filteredArray = daysArray.filter(
                (day) => day.textContent == startDay
              );
              left = (<HTMLElement>filteredArray[0]).offsetLeft;
            }

            if (endDay.endsWith('½')) {
              const filteredArray = daysArray.filter(
                (day) => day.textContent == endDay.slice(0, -1)
              );
              width = (<HTMLElement>filteredArray[0]).offsetLeft +
              (<HTMLElement>filteredArray[0]).offsetWidth / 2 -
              left
            } else {
              const filteredArray = daysArray.filter(
                (day) => day.textContent == endDay
              );
              width =(<HTMLElement>filteredArray[0]).offsetLeft +
              (<HTMLElement>filteredArray[0]).offsetWidth -
              left;
            }

            // apply css
            el.style.left = `${left}px`;
            el.style.width = `${width}px`;
            // if (e.type == "load") {
            el.style.backgroundColor = el.dataset.color;
            el.style.opacity = '1';
            // }
          }
        });
      },
      false
    );
  }
}
