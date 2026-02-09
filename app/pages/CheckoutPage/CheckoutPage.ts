import { Page } from '@playwright/test';
import AddressesSectionComponent from '../../components/AddressesSectionComponent/AddressesSectionComponent';
import BasePage from '../Base/BasePage';
import PersonalInformationSectionComponent from '../../components/PersonalInformationSectionComponent/PersonalInformationSectionComponent';
import ShippingMethodSectionComponent from '../../components/ShippingMethodSectionComponent/ShippingMethodSectionComponent';

export default class CheckoutPage extends BasePage {
  readonly addressesSection: AddressesSectionComponent;
  readonly personalInformationSection: PersonalInformationSectionComponent;
  readonly shippingMethodSection: ShippingMethodSectionComponent;

  constructor(page: Page) {
    super(page);
    this.addressesSection = new AddressesSectionComponent(
      this.page.locator('#checkout-addresses-step')
    );
    this.personalInformationSection = new PersonalInformationSectionComponent(
      this.page.locator('#checkout-personal-information-step')
    );
    this.shippingMethodSection = new ShippingMethodSectionComponent(
      this.page.locator('#checkout-delivery-step')
    );
  }
}
