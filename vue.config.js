const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    disableHostCheck: true,
  },
  pages: {
    index: {
      entry: 'src/apps/index/main.js',
      template: 'public/index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    shop: {
      entry: 'src/apps/Shop/main.js',
      template: 'public/Shop/index.html',
      //filename: 'crm.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    crm: {
      entry: 'src/apps/CRM/main.js',
      template: 'public/crm.html',
      title: 'CRM',
      chunks: ['chunk-vendors', 'chunk-common', 'crm']
    },
  }
})
