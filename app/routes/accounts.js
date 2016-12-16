import Ember from 'ember';

export default Ember.Route.extend({
	isInitialised : false,
	model : function() {
		if(!this.isInitialised) {
			var res = this.store.findAll('account');
			if(res)
				this.isInitialised = true;
			return res;
		}
		return this.store.peekAll('account');
	}
});
