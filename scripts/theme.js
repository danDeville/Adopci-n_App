tailwind.config = {
  theme: {
    extend: {
      colors: {
        Primary: '#FEC7D7',
        Secondary: '#A786DF',
        Tertiary: '#D9D4E7',
        Green: '#85D1CE',
        Grey: '#535353',
        Blue: '#91C1D7',
        White: '#FFFFFE',
        Black: '#0E172C'
      }
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }


      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
    },
    fontFamily: {
      'body': 'Nunito, Arial, sans-serif',
      'sans': 'Nunito, Arial, sans-serif',
    }
  }
}
