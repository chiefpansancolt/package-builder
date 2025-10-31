import { createElement, api } from 'lwc';
import LightningCard from 'c/lightningCard';

class LightningCardWrapper extends LightningCard {
	@api
	get self() {
		return this;
	}
}

describe('c-lightning-card', () => {
	let element;

	beforeEach(() => {
		element = createElement('c-lightning-card', {
			is: LightningCardWrapper
		});
		jest.clearAllMocks();
	});

	afterEach(() => {
		while (document.body.firstChild) {
			document.body.removeChild(document.body.firstChild);
		}
		element = undefined;
	});

	it('renders with default properties', () => {
		document.body.appendChild(element);

		expect(element.self.title).toBeUndefined();
		expect(element.self.iconName).toBeUndefined();
		expect(element.self.loadingAlternativeText).toBeUndefined();
		expect(element.self.isLoading).toBe(false);
		expect(element.self.isEmpty).toBe(false);
		expect(element.self.hideFooter).toBe(false);
		expect(element.self.emptyText).toBe('No Data Available to display.');
		expect(element.self.hasBodyPadding).toBe(false);
		expect(element.self.variant).toBe('base');
	});

	it('computes hasIcon correctly', () => {
		element.self.iconName = 'utility:settings';
		document.body.appendChild(element);

		expect(element.self.hasIcon).toBe(true);
	});

	it('computes loadingText correctly', () => {
		element.self.loadingAlternativeText = 'Loading data...';
		document.body.appendChild(element);

		expect(element.self.loadingText).toBe('Loading data...');
	});

	it('computes cardClassNames correctly for base variant', () => {
		element.self.variant = 'base';
		document.body.appendChild(element);

		expect(element.self.cardClassNames).toBe('slds-card slds-card_boundary');
	});

	it('computes cardClassNames correctly for ui variant', () => {
		element.self.variant = 'ui';
		document.body.appendChild(element);

		expect(element.self.cardClassNames).toBe('slds-card slds-card_boundary slds-var-m-horizontal_large');
	});

	it('computes bodyClassNames correctly with body padding', () => {
		element.self.hasBodyPadding = true;
		document.body.appendChild(element);

		expect(element.self.bodyClassNames).toBe('slds-card__body slds-card__body_inner');
	});

	it('computes bodyClassNames correctly without body padding and no-padding-bottom variant', () => {
		element.self.variant = 'no-padding-bottom';
		document.body.appendChild(element);

		expect(element.self.bodyClassNames).toBe('slds-card__body slds-m-bottom_none');
	});
});
