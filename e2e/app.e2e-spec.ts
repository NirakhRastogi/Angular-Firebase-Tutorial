import { AngularFirebasePage } from './app.po';

describe('angular-firebase App', () => {
  let page: AngularFirebasePage;

  beforeEach(() => {
    page = new AngularFirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
