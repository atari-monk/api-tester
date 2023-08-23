import { HttpMethod } from './HttpMethod';

export interface IRequest {
  method: HttpMethod;
  endpoint: string;
}
