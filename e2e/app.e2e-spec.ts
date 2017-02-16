import { OpinionsPage } from './app.po';

describe('opinions App', function() {
  let page: OpinionsPage;

  beforeEach(() => {
    page = new OpinionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
