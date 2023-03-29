import { Pipe, PipeTransform } from '@angular/core';
import { ASSISTANT_NAME } from '../config';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const name = value === "assistant"
      ? ASSISTANT_NAME
      : value === "user"
        ? "You"
        : value
    return name;
  }

}
