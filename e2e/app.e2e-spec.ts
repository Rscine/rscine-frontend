import { RscineFrontendPage } from './app.po';

describe('rscine-frontend App', () => {
  let page: RscineFrontendPage;

  beforeEach(() => {
    page = new RscineFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
