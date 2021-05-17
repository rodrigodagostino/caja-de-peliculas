module.exports = {
	chainWebpack: config => {
		// Define a human-friendly title for the app.
		config.plugin( 'html' ).tap( args => {
			args[ 0 ].title = 'La Caja de Películas'
			return args
		} )

		// Don't allow importing .vue files without the extension, as
		// it's necessary for some Vetur autocompletions.
		config.resolve.extensions.delete( '.vue' )
	},
}
