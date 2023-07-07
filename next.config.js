const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  }
}

module.exports = withPWA(nextConfig)
