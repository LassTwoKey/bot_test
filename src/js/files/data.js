
import * as flsFunctions from "./functions.js";


//==============================

const GROUPED_BY_MONTH_DURATION = [
	{
		month_duration: 12,
		tariffs: [
			{
				month_duration: 12,
				devices_number: 1,
				result_price: 1500,
				currency: "RUB",
				discount: 20
			},
			{
				month_duration: 12,
				devices_number: 2,
				result_price: 2000,
				currency: "RUB",
				discount: 20
			},
		]
	},
	{
		month_duration: 6,
		tariffs: [
			{
				month_duration: 6,
				devices_number: 1,
				result_price: 1500,
				currency: "RUB",
				discount: 20
			},
			{
				month_duration: 6,
				devices_number: 2,
				result_price: 1700,
				currency: "RUB",
				discount: 20
			},
			{
				month_duration: 6,
				devices_number: 3,
				result_price: 1500,
				currency: "RUB",
				discount: 20
			},
			{
				month_duration: 6,
				devices_number: 4,
				result_price: 2500,
				currency: "RUB",
				discount: 20
			},
		]
	},
	{
		month_duration: 3,
		tariffs: [
			{
				month_duration: 3,
				devices_number: 1,
				result_price: 1500,
				currency: "RUB",
				discount: 43
			},
			{
				month_duration: 3,
				devices_number: 2,
				result_price: 2020,
				currency: "RUB",
				discount: 23
			},
			{
				month_duration: 3,
				devices_number: 3,
				result_price: 2489,
				currency: "RUB",
				discount: 10
			},
			{
				month_duration: 3,
				devices_number: 4,
				result_price: 3000,
				currency: "RUB",
				discount: 73
			},
		]
	},
];


const COUNTRIES = [
	{
		country: 'Belarus',
		id: 'BY',
		discount: 0
	},
	{
		country: 'Norway',
		id: 'NW',
		discount: 56
	},
	{
		country: 'Germany',
		id: 'GR',
		discount: 23
	},
	{
		country: 'Russia',
		id: 'RU',
		discount: 7
	},
	{
		country: 'USA',
		id: 'US',
		discount: 20
	},
	{
		country: 'Belarus',
		id: 'BY',
		discount: 0
	},
	{
		country: 'Norway',
		id: 'NW',
		discount: 56
	},
	{
		country: 'Germany',
		id: 'GR',
		discount: 23
	},
	{
		country: 'Russia',
		id: 'RU',
		discount: 7
	},
	{
		country: 'USA',
		id: 'US',
		discount: 20
	},
];
const PROTOCOL = [
	{
		protocol: "Wiregurad",
		id: 4
	},
	{
		protocol: "OpenVpn",
		id: 5
	},
];

const VpnTariffState = {
	MakeAnOrder: 'MakeAnOrder',
	ExtendVpnSubscription: 'ExtendVpnSubscription'
};

const VpnTariffPage = {
	SelectTariffPage: 'SelectTariffPage',
	InputDevices: 'InputDevices',
	AcceptVpnCard: 'AcceptVpnCard'
}

const allowDeviceToAdd = 3; // ограничения при выборе тарифов на странице tariffs, когда есть +

const limitDevicesSpoller = 5; // ограничения при добавлении девайсов 

const VpnInProcess = {
	protocols: PROTOCOL,
	countries: COUNTRIES,
	groupedByMonthDuration: GROUPED_BY_MONTH_DURATION,

	state: VpnTariffState.MakeAnOrder,
	currentPage: VpnTariffPage.SelectTariffPage,
	selectedTariff: {},
	isTermsOfRulesAccepted: false,
	//devices: [],
	pages: {
		tariffs: document.querySelector('.tariffs'),
		devices: document.querySelector('.devices'),
		payment: document.querySelector('.payment')
	},
	countrols: {
		tariffs: document.querySelector('.btn-tariffs'),
		devices: document.querySelector('.btn-devices'),
		payment: document.querySelector('.btn-payment')
	},
	mainButtons: {
		toСheckout: document.querySelector('[data-checkout]'),
		toPay: document.querySelector('[data-pay]')
	},
	deviceoptionValues: {
		nameAttr: 1,
		id: 1,
		countryValue: 1,
	},


	init() {
		switch (this.state) {
			case VpnTariffState.ExtendVpnSubscription:
				this.switchPage(VpnTariffPage.AcceptVpnCard)
				break;
			case VpnTariffState.MakeAnOrder:
				this.switchPage(VpnTariffPage.SelectTariffPage)
				break;
			default:
				throw 'Wrong statement'
		}
		this.createMonthDurationSpoilers(this.groupedByMonthDuration);
		this.controlsVpn();
		//this.mainButtonsVpn();
		// =================================
		//this.addDevices();
		//this.accessPayClick();
	},
	switchPage(page) {
		if (page === VpnTariffPage.SelectTariffPage) {
			this.pages.tariffs.classList.remove('hidden');
			this.pages.devices.classList.add('hidden');
			this.pages.payment.classList.add('hidden');
			//========================================
			this.countrols.tariffs.classList.remove('hidden');
			this.countrols.devices.classList.add('hidden');
			this.countrols.payment.classList.add('hidden');
			//========================================
			this.mainButtons.toСheckout.classList.add('hidden');
			this.mainButtons.toPay.classList.add('hidden');
			//========================================
			document.querySelector('.devices__block').innerHTML = "";
		}
		if (page === VpnTariffPage.InputDevices) {
			this.pages.tariffs.classList.add('hidden');
			this.pages.devices.classList.remove('hidden');
			this.pages.payment.classList.add('hidden');
			//========================================
			this.countrols.tariffs.classList.remove('hidden');
			this.countrols.devices.classList.remove('hidden');
			this.countrols.payment.classList.add('hidden');
			//========================================
			this.mainButtons.toСheckout.classList.remove('hidden');
			this.mainButtons.toPay.classList.add('hidden');
		}
		if (page === VpnTariffPage.AcceptVpnCard) {
			this.pages.tariffs.classList.add('hidden');
			this.pages.devices.classList.add('hidden');
			this.pages.payment.classList.remove('hidden');
			//========================================
			this.countrols.tariffs.classList.remove('hidden');
			this.countrols.devices.classList.remove('hidden');
			this.countrols.payment.classList.remove('hidden');
			//========================================
			this.mainButtons.toСheckout.classList.add('hidden');
			this.mainButtons.toPay.classList.remove('hidden');
		}
		// =================================
		if (this.state === VpnTariffState.ExtendVpnSubscription) {
			this.countrols.tariffs.classList.add('hidden');
			this.countrols.devices.classList.add('hidden');
			this.countrols.payment.classList.remove('hidden');
			this.countrols.payment.classList.add('only-payment');
		}

	},
	controlsVpn() {
		this.countrols.tariffs.onclick = () => {
			this.switchPage(VpnTariffPage.SelectTariffPage);
			this.deviceoptionValues.id = 1;
			this.deviceoptionValues.nameAttr = 1;
			this.deviceoptionValues.countryValue = 1;
		}
		this.countrols.devices.onclick = () => {
			this.switchPage(VpnTariffPage.InputDevices);
		}
		this.countrols.payment.onclick = () => {
			this.switchPage(VpnTariffPage.AcceptVpnCard);
		}
	},
	mainButtonsVpn() {
		this.mainButtons.toСheckout.onclick = () => {
			this.switchPage(VpnTariffPage.AcceptVpnCard);
			this.createPaymentSelection();
			this.accessPayClick();
		}
	},
	//===========
	createMonthDurationSpoilers(groupedByMonthDuration) {
		const groupedBy = groupedByMonthDuration;
		const monthDurationSpoilerBlock = document.querySelector('[data-spoller-tariffs]');
		for (let i = 0; i < groupedBy.length; i++) {

			const monthDuration = groupedBy[i].month_duration;
			const tariffs = groupedBy[i].tariffs;

			const monthDurationSpoiler = document.createElement("div");
			monthDurationSpoiler.classList.add("spollers__item");
			monthDurationSpoiler.classList.add("tariffs__item");
			monthDurationSpoilerBlock.appendChild(monthDurationSpoiler);

			const monthDurationSpoilerBtn = document.createElement("button");
			monthDurationSpoilerBtn.setAttribute('data-spoller', '');
			monthDurationSpoilerBtn.setAttribute('type', 'button');
			monthDurationSpoilerBtn.classList.add("spollers__title");
			monthDurationSpoilerBtn.classList.add("tariffs__title");
			monthDurationSpoilerBtn.innerHTML = `
				${monthDuration} месяцев
			`;
			if (i === 0) {
				monthDurationSpoilerBtn.classList.add("_spoller-active");
			}
			monthDurationSpoiler.appendChild(monthDurationSpoilerBtn);


			const monthDurationSpoilerBody = document.createElement("div");
			monthDurationSpoilerBody.classList.add("spollers__body");
			monthDurationSpoiler.appendChild(monthDurationSpoilerBody);

			const monthDurationSpoilerContainer = document.createElement("div");
			monthDurationSpoilerContainer.classList.add("info-tariffs");
			monthDurationSpoilerBody.appendChild(monthDurationSpoilerContainer);

			for (let j = 0; j < tariffs.length; j++) {
				const vpnTariff = this.createVPNTariff(tariffs[j].month_duration, tariffs[j].devices_number, tariffs[j].result_price, tariffs[j].currency, tariffs[j].discount)
				monthDurationSpoilerContainer.appendChild(vpnTariff);
			}
		}
	},
	createVPNTariff(monthDuration, devicesNumber, price, currency, discount) {
		const vpnTariff = document.createElement("div");
		vpnTariff.classList.add("info-tariffs__item");
		vpnTariff.innerHTML = `
			<h2 class="mon-count">${monthDuration}</h2>
			<h2 class="mon-text">месяцев</h2>
			<h2 class="subscription">подписки</h2>
			<h3 class="devices-number"><span>${devicesNumber}</span> устройство</h3>
			<h3 class="price">${price} ${currency}</h3>
			<span class="discount">${discount}%</span>
		`;

		vpnTariff.addEventListener('click', (e) => {
			this.selectedTariff = {
				month_duration: monthDuration,
				price: price,
				discount: discount,
				currency: currency,
				devicesNumber: devicesNumber
			}
			this.switchPage(VpnTariffPage.InputDevices);

			this.createDeviceSpollers(this.selectedTariff, document.querySelector('[data-spoller-devices]'), false);

			this.mainButtonsVpn();
			this.addDevices();
		})

		return vpnTariff;
	},
	//===========
	createDeviceSpollers(selectedTariff, spollerContainer, isAddSpoiller) {
		let spolierCounter;

		const selectedValues = selectedTariff;
		const deviceSpoilerBlock = spollerContainer;

		if (deviceSpoilerBlock.children.length + 2 > limitDevicesSpoller) {
			this.addDevices(true);
		}

		if (isAddSpoiller) {
			spolierCounter = 1;
		} else {
			spolierCounter = selectedValues.devicesNumber;
		}

		for (let i = 0; i < spolierCounter; i++) {
			//this.devices.push(1);

			//const spoilerNum = deviceSpoilerBlock.children.length + 1;

			const deviceEl = document.createElement('div')
			deviceEl.classList.add("devices__item");
			deviceSpoilerBlock.appendChild(deviceEl);

			const deviceSpoilerBtn = document.createElement("button");
			deviceSpoilerBtn.setAttribute('data-spoller', '');
			deviceSpoilerBtn.setAttribute('type', 'button');
			deviceSpoilerBtn.classList.add("spollers__title");
			deviceSpoilerBtn.classList.add("devices__title");
			deviceSpoilerBtn.innerHTML = `
				Устройство ${this.deviceoptionValues.nameAttr}
			`;
			deviceEl.appendChild(deviceSpoilerBtn);

			const deviceSpoilerBody = document.createElement("div");
			deviceSpoilerBody.classList.add("spollers__body");
			deviceSpoilerBody.classList.add("devices__body");
			deviceEl.appendChild(deviceSpoilerBody);

			const devicesDropdown = document.createElement("div");
			devicesDropdown.classList.add("devices__dropdown");
			devicesDropdown.classList.add("closed");
			deviceSpoilerBody.appendChild(devicesDropdown);

			const devicesDropdownButton = document.createElement("h2");
			devicesDropdownButton.classList.add("devices__dropdown-title");
			devicesDropdownButton.innerHTML = `Выберите страну`;
			devicesDropdown.appendChild(devicesDropdownButton);

			const devicesDropdownList = document.createElement("ul");
			devicesDropdownList.classList.add("devices__dropdown-list");
			devicesDropdown.appendChild(devicesDropdownList);


			const contentOption = document.createElement("div");
			contentOption.classList.add('options');
			contentOption.classList.add('devices__options');
			deviceSpoilerBody.appendChild(contentOption);

			for (let j = 0; j < this.countries.length; j++) {
				devicesDropdownList.appendChild(this.createDeviceContries(devicesDropdown, devicesDropdownButton, j));
			}
			for (let k = 0; k < this.protocols.length; k++) {
				contentOption.appendChild(this.createDeviceProtocols(i, k));
			}
			devicesDropdownButton.onclick = (e) => {
				devicesDropdown.classList.toggle('closed');
			}
			flsFunctions.spollers();
			this.deviceoptionValues.nameAttr++;
		}
	},
	createDeviceContries(dropdown, elemButton, index) {
		const country = this.countries[index].country;
		const devicesDropdownItem = document.createElement("li");
		devicesDropdownItem.classList.add("devices__dropdown-item");
		devicesDropdownItem.setAttribute('country', `${this.deviceoptionValues.countryValue}`);
		devicesDropdownItem.innerHTML = `${country}`;

		devicesDropdownItem.onclick = (e) => {
			elemButton.innerHTML = `${devicesDropdownItem.innerText}`;
			dropdown.classList.toggle('closed');
		}
		this.deviceoptionValues.countryValue++;
		return devicesDropdownItem;
	},
	createDeviceProtocols(DeviceSpollerIndex, DeviceProtocolIndex) {
		const protocol = this.protocols[DeviceProtocolIndex].protocol;

		const optionProtocol = document.createElement("div");
		optionProtocol.classList.add('options__item');

		optionProtocol.innerHTML = `
		<input hidden id="o_${this.deviceoptionValues.nameAttr}_${this.deviceoptionValues.id}" class="options__input" checked type="radio" value="r_${DeviceProtocolIndex}_1" name="option${this.deviceoptionValues.nameAttr}">
		<label for="o_${this.deviceoptionValues.nameAttr}_${this.deviceoptionValues.id}" class="options__label">
			<span class="options__text">${protocol}</span>
		</label>
		`;
		this.deviceoptionValues.id++;
		return optionProtocol;
	},
	//===========
	createPaymentSelection() {
		const month_duration = this.selectedTariff.month_duration;
		const price = this.selectedTariff.price;
		const discount = this.selectedTariff.discount;
		const currency = this.selectedTariff.currency;

		const PaymentSelectionContainer = document.querySelector('.payment__info-content');
		document.querySelector('.payment__title').innerHTML = `Доступ к VPN на ${month_duration} месяцев.`;
		PaymentSelectionContainer.innerHTML = `
			<div class="payment__info">
				<div class="payment__currency">
					<div class="payment__initial">${price} ${currency}</div>
				</div>
				<div class="payment__mon">${month_duration}</div>
				<div class="payment__mon-text">месяцев подписки на VPN</div>
				<span class="discount">${discount}%</span>
			</div>
		`;
	},
	//===========
	updatePaymentButton() {
		const checkbox = this.querySelector('input');
		const buttonPay = document.querySelector('[data-pay]');
		if (checkbox.checked) {
			buttonPay.classList.add('checked');
		} else {
			buttonPay.classList.remove('checked');
		}
	},
	accessPayClick() {
		const checkedElement = document.querySelector('.checkbox');
		checkedElement.addEventListener('change', this.updatePaymentButton);
	},
	addDevices(isLimited = null) {
		const addDeviceButton = document.querySelector('.devices__add');
		if (this.selectedTariff.devicesNumber >= allowDeviceToAdd || isLimited) {
			addDeviceButton.innerHTML = '';
		} else {
			addDeviceButton.innerHTML = `
				<button data-add-device class="devices__add-button">
					<span class="">+</span>
				</button>
			`;
			addDeviceButton.addEventListener('click', e => {
				this.createDeviceSpollers(this.selectedTariff, document.querySelector('[data-spoller-devices]'), true)
			});
		}
	},
}

VpnInProcess.init();


