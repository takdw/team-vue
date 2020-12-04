# Team (Vue)

## Requirements

- Node
- Yarn/NPM

## Installation

Clone the repository to your local folder. Run the command below to install all the node dependencies.

```
yarn install
```

Make a copy of the `.env.exmaple` file and rename it to `env.development.local` or `env.local`. Then set the `VUE_APP_API_BASE_URL` to the API base URL of your API server.

Run the command below to compile the assets in development mode and start a watcher.

```
yarn serve
```

You can run the command below to build the assets for production.

```
yarn build
```

## Testing

```
yarn test:unit
```
