class DDWasteCollectionCard extends HTMLElement {
	set hass(hass) {
		const VERSION="0.00.007";
		if (!this.content) {
			this.innerHTML = `
				<link type="text/css" rel="stylesheet" href="/local/community/DD-WasteCollection-Card/dd-wastecollection-card.css">
				<ha-card>
  					<div class="card-content"></div>
    				</ha-card>
			`;
			this.content = this.querySelector("div");
		}	
		
		//const nextpickup = hass.states[this.config.entity] ? new Date(hass.states[this.config.entity].state) : "unavailable";
		//const pickuptype = hass.states[this.config.entity] ? state_attr(this.config.entity, 'Pickup Type') : "unavailable";

		const nextpickup = "Today";
		const pickuptype = "garbage recycling greenbin";
		
		let myHTML = `
  			<div class="dd-wastecollection-container" title="${VERSION}">
     				${nextpickup}
	 			${pickuptype}
			</div>
		`;

		this.content.innerHTML = myHTML;
  	}

	// The user supplied configuration. Throw an exception and Home Assistant
	// will render an error card.
	setConfig(config) {
		if (!config) {
		  throw new Error("Invalid configuration");
		}
		this.config = config;
	}
	
	// The height of your card. Home Assistant uses this to automatically
	// distribute all cards over the available columns in masonry view
	getCardSize() {
		return 4;
	}
		
	// The rules for sizing your card in the grid in sections view
	getLayoutOptions() {
		return {
			grid_rows: 2,
			grid_columns: 3,
			grid_min_rows: 2,
			grid_max_rows: 2,
		};
	}
		
	static getStubConfig() {
		return { entity: "sensor.recollect_waste_next_pickup" }
	}
}

customElements.define("dd-wastecollection-card", DDWasteCollectionCard);

// Add card type to the Home Assistant card registry
window.customCards = window.customCards || [];
window.customCards.push({
	type: 'dd-wastecollection-card',
	name: 'DD Waste Collection Card',
	description: 'a DoubleD Waste Collection Card',
	preview: true,
});
