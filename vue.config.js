const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/')
            }
        }
    },
    pluginOptions: {
        vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    },
    devServer: {
        proxy: {
            "/users": {
                target: 'http://dev-faker-be.herokuapp.com',
                changeOrigin: true
            }
        } 
    }
})
