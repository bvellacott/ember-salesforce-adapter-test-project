import SFModels from 'npm:salesforce-ember-models';
SFModels.Ember = Ember;
SFModels.DS = DS;

export function initialize( appInstance ) {
	window.App = appInstance;
	var schemaReader = new SFModels.SchemaReader(sforce.connection, 100, 
	() => {
		console.log('fetch complete');
		var ns = {};
		SFModels.createModelsForSObjects(ns, schemaReader.completeMetas, schemaReader, 
		(type) => {
			return type.name in { 'Account': true, 'User': true };
		});

		for(var name in ns) {
  		appInstance.register('model:' + name, ns[name], { instantiate: false });
		}

		// App.advanceReadiness();
	},
	() => {
		console.log('fetch failed');
		// App.advanceReadiness();
	});
};

// export default { 
//   name: 'sf-models',

//   initialize: function(container, application) {
// 		// App.deferReadiness();
// 		var schemaReader = new SFModels.SchemaReader(sforce.connection, 100, 
// 		() => { 
// 			console.log('fetch complete');
// 			window.App = {};
// 			SFModels.createModelsForSObjects(window.App, schemaReader.completeMetas, schemaReader, 
// 				(type) => {
// 					return type.name in { 'Account': true, 'User': true };
// 				});
// 			// App.advanceReadiness();
// 		},
// 		() => {
// 			console.log('fetch failed');
// 			// App.advanceReadiness();
// 		});

//     application.register('model:DS.SharedLibrary.User', DS.SharedLibrary.User);
//   }
// };
