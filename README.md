# Ovoflow - Egg Farmers' App

## Setup

- Clone this repository to your machine
- Navigate to the project directory and install the dependencies with `npm install`
- Create a file named `.env.local` for the environment variables in the root directory

  ```text
  NEXT_PUBLIC_DRUPAL_BASE_URL=[[drupal_api]]
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=[[mapbox_access_token]]
  ```

  - For `drupal_api`, ask the adminstrator for information
  - For `mapbox_access_token`, register an account from [mapbox](https://account.mapbox.com/auth/signup/) to receive ones
  
- Start the development server with `npm run dev` and open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Additional information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Poppins, a custom Google Font.
