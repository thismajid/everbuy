import { Injectable } from '@nestjs/common';
import { Phone } from 'ircheck';

@Injectable()
export class UsersService {
  normalizeMobile({ mobile }) {
    return `+98${Phone.normalizeMobile(mobile)}`;
  }
}
