import Ember from 'ember';

export default Ember.Controller.extend({
	actions : {
		add : function() {
			var that = this;
			this.store.find('user', UserInfo.userId).then(function(user) {
				var acc = that.store.createRecord('account', {
					Name : 'Potential Customer',
					Description : 'Customer description',
				});
				acc.set('OwnerId', user);
				acc.save().then(function(){
					that.transitionToRoute('account', acc);
				});
			});
		},
	}
});