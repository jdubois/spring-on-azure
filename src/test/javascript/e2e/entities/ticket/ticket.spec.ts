/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TicketComponentsPage, TicketDeleteDialog, TicketUpdatePage } from './ticket.page-object';

const expect = chai.expect;

describe('Ticket e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ticketUpdatePage: TicketUpdatePage;
  let ticketComponentsPage: TicketComponentsPage;
  let ticketDeleteDialog: TicketDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tickets', async () => {
    await navBarPage.goToEntity('ticket');
    ticketComponentsPage = new TicketComponentsPage();
    await browser.wait(ec.visibilityOf(ticketComponentsPage.title), 5000);
    expect(await ticketComponentsPage.getTitle()).to.eq('Tickets');
  });

  it('should load create Ticket page', async () => {
    await ticketComponentsPage.clickOnCreateButton();
    ticketUpdatePage = new TicketUpdatePage();
    expect(await ticketUpdatePage.getPageTitle()).to.eq('Create or edit a Ticket');
    await ticketUpdatePage.cancel();
  });

  it('should create and save Tickets', async () => {
    const nbButtonsBeforeCreate = await ticketComponentsPage.countDeleteButtons();

    await ticketComponentsPage.clickOnCreateButton();
    await promise.all([
      ticketUpdatePage.setTitleInput('title'),
      ticketUpdatePage.setDescriptionInput('description'),
      ticketUpdatePage.setDueDateInput('2000-12-31'),
      ticketUpdatePage.projectSelectLastOption(),
      ticketUpdatePage.assignedToSelectLastOption()
      // ticketUpdatePage.labelSelectLastOption(),
    ]);
    expect(await ticketUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await ticketUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await ticketUpdatePage.getDueDateInput()).to.eq('2000-12-31', 'Expected dueDate value to be equals to 2000-12-31');
    const selectedDone = ticketUpdatePage.getDoneInput();
    if (await selectedDone.isSelected()) {
      await ticketUpdatePage.getDoneInput().click();
      expect(await ticketUpdatePage.getDoneInput().isSelected(), 'Expected done not to be selected').to.be.false;
    } else {
      await ticketUpdatePage.getDoneInput().click();
      expect(await ticketUpdatePage.getDoneInput().isSelected(), 'Expected done to be selected').to.be.true;
    }
    await ticketUpdatePage.save();
    expect(await ticketUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ticketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ticket', async () => {
    const nbButtonsBeforeDelete = await ticketComponentsPage.countDeleteButtons();
    await ticketComponentsPage.clickOnLastDeleteButton();

    ticketDeleteDialog = new TicketDeleteDialog();
    expect(await ticketDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Ticket?');
    await ticketDeleteDialog.clickOnConfirmButton();

    expect(await ticketComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
