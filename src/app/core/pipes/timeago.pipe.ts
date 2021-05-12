import { Pipe, PipeTransform } from '@angular/core';

declare type Interval = { [key: string]: number };

@Pipe({
  name: 'timeAgo',
  pure: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | number): string | number {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      }

      const intervals: Interval = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };

      let counter: number;

      // tslint:disable-next-line: forin
      for (const key in intervals) {
        counter = Math.floor(seconds / intervals[key]);

        if (counter > 0) {
          if (counter === 1) {
            return `${counter} ${key} ago`; // singular (1 day ago)
          } else {
            return `${counter} ${key}s ago`; // plural (2 days ago)
          }
        }
      }
    }

    return value;
  }

}
