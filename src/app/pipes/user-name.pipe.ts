import { Pipe, PipeTransform } from '@angular/core';
import { assistantName } from '../config';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const name = value === "assistant"
      ? assistantName
      : value === "user"
        ? "You"
        : value
    return name;
  }

}
