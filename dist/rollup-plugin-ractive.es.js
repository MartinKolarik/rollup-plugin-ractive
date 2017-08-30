import { extname } from 'path';
import Ractive from 'ractive';
import rcu from 'rcu';
import * as builders from 'rcu-builders';
import { createFilter } from 'rollup-pluginutils';

rcu.init( Ractive );

function dsv ( options ) {
	if ( options === void 0 ) options = {};

	var filter = createFilter( options.include, options.exclude );
	var extensions = options.extensions || [ '.html' ];
	var format = options.format || 'es6';

	return {
		name: 'ractive',

		transform: function transform ( code, id ) {
			if ( !filter( id ) ) { return null; }

			if ( !~extensions.indexOf( extname( id ) ) ) { return null; }

			var definition = rcu.parse( code, options.parseOptions );
			var module = builders[ format ]( definition, {
				preserveExtensions: true,
				sourceMap: true
			});

			return module;
		}
	};
}

export default dsv;
