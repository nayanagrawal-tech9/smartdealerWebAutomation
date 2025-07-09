import { setWorldConstructor, IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext } from 'playwright';
import { POManager } from '../PageObjects/POManager';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  poManager!: POManager;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld); // ✅ must be called