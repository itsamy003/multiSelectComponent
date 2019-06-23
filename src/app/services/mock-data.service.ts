import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  public data: any = [];
  constructor() { }
  getMockData() {
    return [];
  }
}
