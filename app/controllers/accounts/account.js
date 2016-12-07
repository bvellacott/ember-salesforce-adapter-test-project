import Ember from 'ember';

export default Ember.Controller.extend({
	init : function() {
		this.isEditing = false;
	},
	actions : {
		edit : function() {
			this.set('isEditing', true);
		},
		save : function(acc) {
			this.set('isEditing', false);
			acc.save();
		},
		cancel : function(acc) {
			this.set('isEditing', false);
			acc.rollback();
		},
		del : function(acc) {
			this.set('isEditing', false);
			var accs = this.store.peekAll('account').toArray();
			var idx = accs.indexOf(acc);
			acc.destroyRecord();
			accs.splice(idx, 1);
			surroundingAccs = accs.objectsAt([idx-1, idx, idx+1]);
			for(var i = 0; i < surroundingAccs.length; i++) {
				var nextAcc = surroundingAccs[i];
				if(typeof nextAcc !== 'undefined') {
					this.transitionToRoute('account', nextAcc);
					break;
				}
			}
		}
	}
});