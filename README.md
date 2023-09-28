# fetch-backend
Fetch-backend: Home Assignment API implementation

## Setup
```
# Pull the repository to the local machine
$ git clone https://github.com/divy9881/fetch-backend

# Change directory to the fetch-backend
$ cd ./fetch-backend

# Install npm(node package manager) dependencies
$ npm install

# Start the API server
# npm run app
```

## File tree

- **app.js** - Main API server entry file and the logic of server
- **json-store** - Used by the API server to persist the payer transactions to the disk. Can be thought of as a datastore or a file-based database
- **package.json** - Used by npm(node package manager) to keep track of external dependencies and to create automated scripts
- **.gitignore** - To ignore node dependency directory and other beefy files, so as to not take up much git storage space

## Code specification
- The API server is built in Node.js, Express MVC framework
- The code comments are being used to document and describe the logic behind the code
- For the sake of simplicity, the API server uses file-based datastore to store the user transactions, so as to avoid lengthy setups required by fully-featured databases like MySQL, MongoDB, etc
