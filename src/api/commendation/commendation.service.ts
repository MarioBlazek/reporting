import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as hb from 'handlebars';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

// import axios, { AxiosResponse } from 'axios';
import { ICommendee } from 'src/models/commendee';

@Injectable()
export class CommendationService {
  async generateReport(commendee: ICommendee): Promise<Buffer> {
    const templatePath = path.resolve('./src/templates/report/index.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    const template = hb.compile(templateHtml, { strict: true });

    const html = template(commendee);
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    await page.setContent(html);

    const headerTemplate = `<header style="margin: 4px 35.3px 0px 35.3px; -webkit-print-color-adjust: exact; width: 100%;">
      <div style="display: flex; justify-content: center;">
<!--        <img src="data:image/png;base64" width="120px" />-->
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 25px;">
        <div style="width: 50%;">
          <p style="margin: 0; padding: 0; font-size: 9px; color: #63747e;">
            Nelt Report for
          </p>
          <p style="margin: 0; padding: 0; font-size: 10px; font-weight: 700; color: #283033; margin-top: 4px;">
            ${commendee.name}
          </p>
        </div>
        <div style="width: 50%; text-align: right;">
          <p style="margin: 0; padding: 0; font-size: 9px; color: #63747e;">
            Employee
          </p>
          <p style="margin: 0; padding: 0; font-size: 10px; font-weight: 700; color: #283033; margin-top: 4px;">
            ${commendee.name}
          </p>
        </div>
      <div>
    </header>
    `;

    const footerTemplate = `
    <footer style="margin: 0 38.4px 22px 38.4px; font-size: 9px; color:#63747e; -webkit-print-color-adjust: exact;">
      <p style="text-align: center; margin: 0; padding: 0;">
        Some very simple description
      </p>
      <div style="display: flex; justify-content: space-between; margin-top: 24px;">
         <p style="margin: 0; padding: 0; font-weight: 600; font-size: 9px;">jenz.app</p>
         <p style="margin: 0; padding: 0; font-weight: 600; font-size: 9px;">
          Page <span class="pageNumber"></span> 
          of <span class="totalPages"></span>
         </p>
       </div>
    </footer>
    `;

    const buffer = await page.pdf({
      format: 'a4',
      margin: { top: 145, right: 40, bottom: 145, left: 40 },
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
    });

    await browser.close();

    return buffer;
  }

  async getCommendationFromRemoteApi(name: string): Promise<ICommendee> {
    // do Axios request to Jenz API

    const response = {
      "name": "Luka Jadrijević Mladar",
      "commendations": [
        {
          "text": "Luka je blabla. Hvala ti...",
          "author": "Olga Žarković",
          "department": "HR",
          "country": "Srbija"
        },
        {
          "text": "Baš si super!",
          "author": "Marijana Mišić,",
          "department": "Finansije,",
          "country": "BiH"
        },
        {
          "text": "Jeah",
          "author": "Marijana Mišić,",
          "department": "Finansije,",
          "country": "BiH"
        },
        {
          "text": "Ouuu daaaa",
          "author": "Marijana Mišić,",
          "department": "Finansije,",
          "country": "BiH"
        },
      ],
    };

    return response as ICommendee;
  }
}
