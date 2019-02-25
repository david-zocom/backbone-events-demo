// lordOfTheRingsCollection
const members = [
	{ name: 'Frodo', race: 'hobbit' },
	{ name: 'Aragorn', race: 'människa' },
	{ name: 'Gimli', race: 'dvärg' }
];

const MemberModel = Backbone.Model.extend({
	defaults: {
		name: null, race: null,
		edit: false, formName: null, formRace: null
	},
	editMode: function() {
		console.log('MemberModel.editMode');
		this.set({
			edit: true,
			formName: this.get('name'),
			formRace: this.get('race')
		});
	},
	saveEdits: function() {
		console.log('MemberModel.saveEdits');
		this.set({
			edit: false,
			name: this.get('formName'),
			race: this.get('formRace')
		});
	},
});
const MemberCollection = Backbone.Collection.extend({
	model: MemberModel
});

let memberCollection = new MemberCollection(members);

const MemberView = Backbone.View.extend({
	tag: 'li',
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		// console.log('MemberView.render ' + this.model.get('name'));
		let formName = this.model.get('formName');
		let formRace = this.model.get('formRace');
		let edit = `<span class="edit">🖊️</span>`;
		let remove = `<span class="remove">💣</span>`;
		let content;
		if( this.model.get('edit') ) {
			let name = `<input class="editName" value="${formName}" />`;
			let race = `<input class="editRace" value="${formRace}" />`;
			let saveBox = `<span class="save">✔️</span>`;
			content = `${name} ${race} ${saveBox} ${remove}`;
		} else {
			let name = this.model.get('name');
			let race = this.model.get('race');
			content = `${name} är en ${race} - ${edit} ${remove}`;
		}
		this.$el.html(content);  // this.$el är ett li-element
	},
	events: {
		"click .remove": 'remove',
		"click .edit": 'editMode',
		"click .save": 'saveChanges',
		"change .editName": 'editName',
		"change .editRace": 'editRace'
	},
	remove: function(event) {
		memberCollection.remove(this.model);
	},
	editMode: function(event) {
		this.model.editMode();
	},
	saveChanges: function(event) {
		this.model.saveEdits();
	},
	editName: function(event) {
		this.model.set({ formName: event.target.value });
	},
	editRace: function(event) {
		this.model.set({ formRace: event.target.value });
	}
})

const MemberListView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
		this.listenTo(this.collection, 'change', this.render);
	},
	render: function() {
		// console.log('MemberListView.render 1');
		let el = this.$el;
		// let ul = document.createElement('ul');
		let ul = $('<ul></ul>')
		this.collection.forEach(function(member) {
			let memberView = new MemberView({ model: member });
			memberView.render();
			ul.append(memberView.$el);
		});
		el.html('');
		el.append(ul);
		let addForm = `<input type="text" id="inputName" value="Merry">
		<input type="text" id="inputRace" value="hobbit">
		<button type="button" id="addMemberButton">Lägg till</button>`;
		el.append(addForm);
	},
	events: {
		"click #addMemberButton": 'onAddMemberButtonClick',
		"change #inputName": 'onNameChange',
		"change #inputRace": 'onRaceChange'
	},
	onAddMemberButtonClick: function(event) {
		// ta info från input-fälten och lägga till i collection
		let model = new MemberModel({
			name: this.form.name,
			race: this.form.race
		});
		this.collection.add(model);
	},
	form: { name: '', race: '' },
	onNameChange: function(event) { this.form.name = event.target.value; },
	onRaceChange: function(event) { this.form.race = event.target.value; }
})


$(document).ready(function() {
	let memberListView = new MemberListView({
		collection: memberCollection,
		el: '#lordOfTheRingsCollection'
	});
	memberListView.render();
	console.log('document ready');
});








//
