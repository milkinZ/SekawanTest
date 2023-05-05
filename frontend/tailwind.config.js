module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: [
      "./node_modules/flowbite/**/*.js",
    ],
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

