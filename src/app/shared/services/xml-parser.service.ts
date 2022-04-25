import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class XmlParserService {

  constructor() { }

  parseXML(data: string): Promise<any> {
    return new Promise<any>(resolve => {
      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: false
      });
      parser.parseString(data, function (err: any, result: any) {
        resolve(result);
      });
    });
  }
}
