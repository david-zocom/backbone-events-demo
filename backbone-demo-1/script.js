const data = {
	cart: {
		numberOfItems: 0
	}
};

const CartModel = Backbone.Model.extend({
	defaults: {
		numberOfItems: 0
	}
});

let cartModelInstance = new CartModel({});
console.log(cartModelInstance.get('numberOfItems'));

const CartView = Backbone.View.extend({
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



$(document).ready(function() {
	let cartViewInstance = new CartView({
		el: '.cartContainer',
		model: cartModelInstance
	});

	// cartViewInstance.$el = ...
	cartViewInstance.render();

	$('#addGoatToCart').on('click', function(event) {
		let count = cartModelInstance.get('numberOfItems');
		cartModelInstance.set({ numberOfItems: count + 1 });
		cartViewInstance.render();
		if( count === 0 ) {
			$('#removeGoatFromCart').prop( "disabled", false );
		}
	});
	$('#removeGoatFromCart').on('click', function(event) {
		let count = cartModelInstance.get('numberOfItems');
		cartModelInstance.set({ numberOfItems: count - 1 });
		cartViewInstance.render();
		if( count <= 1 ) {
			$('#removeGoatFromCart').prop( "disabled", true );
		}
	});
});



//
