import { Page } from '@playwright/test';
import AddressSection from '../../components/AddressSection/AddressSection';
import BasePage from '../Base/BasePage';
import PersonalInfoSection from '../../components/PersonalInfoSection/PersonalInfoSection';
import ShippingSection from '../../components/ShippingSection/ShippingSection';

export default class CheckoutPage extends BasePage {
  readonly addressSection: AddressSection;
  readonly personalInfoSection: PersonalInfoSection;
  readonly shippingSection: ShippingSection;

  constructor(page: Page) {
    super(page);
    this.addressSection = new AddressSection(
      this.page.locator('#checkout-addresses-step')
    );
    this.personalInfoSection = new PersonalInfoSection(
      this.page.locator('#checkout-personal-information-step')
    );
    this.shippingSection = new ShippingSection(
      this.page.locator('#checkout-delivery-step')
    );
  }
}
