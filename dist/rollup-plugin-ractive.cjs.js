'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var Ractive = _interopDefault(require('ractive'));
var rcu = _interopDefault(require('rcu'));
var builders = require('rcu-builders');
var rollupPluginutils = require('rollup-pluginutils');

rcu.init( Ractive );

function dsv ( options ) {
	if ( options === void 0 ) options = {};

	var filter = rollupPluginutils.createFilter( options.include, options.exclude );
	var extensions = options.extensions || [ '.html' ];
	var format = options.format || 'es6';

	return {
		name: 'ractive',

		transform: function transform ( code, id ) {
			if ( !filter( id ) ) { return null; }

			if ( !~extensions.indexOf( path.extname( id ) ) ) { return null; }

			var definition = rcu.parse( code, options.parseOptions );
			var module = builders[ format ]( definition, {
				preserveExtensions: true,
				sourceMap: true
			});

			return module;
		}
	};
}

module.exports = dsv;
