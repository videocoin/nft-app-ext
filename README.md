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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Install Opensea

Before starting the application you will need to install the Opensea. From the project root run

### git submodule update --init

Now cd into src/Opensea-js and run

### npm i

Once the submodules dependencies have finished installing you can cd back up to the top and run start the dev server.



