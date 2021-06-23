# NFT-APP

NFT marketplace front-end 

## Environment Variables

Before application start environemnt variables should be defined, i.e.:

```
REACT_APP_BASE_URL='https://marketplace.dev.videocoin.network/api/v1'
REACT_APP_NETWORKS=1337,5
```

`REACT_APP_BASE_URL` should be pointing to NFT marketplace back-end.

`REACT_APP_NETWORKS` should contain a list of awailable network ids for metamask to connecto to (1337 is default network id for ganache).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



