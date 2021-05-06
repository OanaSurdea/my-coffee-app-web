import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  pure: true
})
export class StarRatingPipe implements PipeTransform {

  transform(rating: number): any {
    let result: string[] = null;

    if (rating) {
      result = [];

      for (let i = 0; i < rating; i++) {
        result.push('⭐');
      }
    }

    return result.join('');
  }
}
