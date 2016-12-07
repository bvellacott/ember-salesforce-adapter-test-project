import Ember from 'ember';
import DS from 'ember-data';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

// import SFAdapter from 'ember-salesforce-adapter';
import SFModels from 'npm:salesforce-ember-models';
SFModels.Ember = Ember;
SFModels.DS = DS;

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

// App.deferReadiness();
var schemaReader = new SFModels.SchemaReader(sforce.connection, 100, 
() => { 
	console.log('fetch complete');
	window.App = {};
	SFModels.createModelsForSObjects(window.App, schemaReader.completeMetas, schemaReader, 
		(type) => {
			return type.name in { 'Account': true, 'User': true };
		});
	// App.advanceReadiness();
},
() => {
	console.log('fetch failed');
	// App.advanceReadiness();
});

export default App;
