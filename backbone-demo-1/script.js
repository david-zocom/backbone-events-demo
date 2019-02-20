const data = {
	cart: {
		numberOfItems: 0
	}
};

const CartModel = Backbone.Model.extend({
	defaults: {
		numberOfItems: 0
	},
	increase: function() {
		let oldValue = this.get('numberOfItems');
		this.set({ numberOfItems: oldValue + 1 });
	},
	decrease: function() {
		let oldValue = this.get('numberOfItems');
		this.set({ numberOfItems: oldValue - 1 });
	}
});

let cartModelInstance = new CartModel({});
console.log(cartModelInstance.get('numberOfItems'));

const CartView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		let numberOfItems = this.model.get('numberOfItems');
		if( numberOfItems === 0 ) {
			this.$el.html(`Kundvagnen är tom :(`);
		} else if( numberOfItems === 1 ) {
			this.$el.html(`Kundvagnen innehåller ${numberOfItems} get!`);
		} else {
			this.$el.html(`Kundvagnen innehåller ${numberOfItems} getter!`);
		}
	}
});

const GoatButtonView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		let addEnabled = 'disabled';
		if( cartModelInstance.get('numberOfItems') > 0 ) {
			addEnabled = '';
		}
		let addButton = `<button id="addGoatToCart">Lägg till get i kundvagnen</button>`;
		let removeButton = `<button id="removeGoatFromCart" ${addEnabled}>Ta bort get</button>`;
		let content = `${addButton} ${removeButton} <button>Köp nu!</button>`;
		this.$el.html(content);
	},
	events: {
		"click #addGoatToCart": 'addGoatToCart',
		"click #removeGoatFromCart": 'removeGoatFromCart'
	},
	addGoatToCart: function() {
		this.model.increase();
	},
	removeGoatFromCart: function() {
		this.model.decrease();
	}
});



$(document).ready(function() {
	let cartViewInstance = new CartView({
		el: '.cartContainer',
		model: cartModelInstance
	});
	let goatButtonViewInstance = new GoatButtonView({
		el: '.storeContainer',
		model: cartModelInstance
	})

	// cartViewInstance.$el = ...
	cartViewInstance.render();
	goatButtonViewInstance.render();
});



//
