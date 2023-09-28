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

- **app.js** - Main API server entry file and the logic of the server
- **json-store** - Used by the API server to persist the payer transactions to the disk. Can be thought of as a data store or a file-based database
- **package.json** - Used by npm(node package manager) to keep track of external dependencies and to create automated scripts
- **.gitignore** - To ignore node dependency directory and other beefy files, so as to not take up much git storage space

## Code specification
- The API server is built in Node.js, Express MVC framework
- The code comments are being used to document and describe the logic behind the code
- For the sake of simplicity, the API server uses a file-based datastore to store the user transactions, so as to avoid lengthy setups required by fully-featured databases like MySQL, MongoDB, etc

## API endpoint testing on Postman
The code repository was tested against REST API requests. The requests can be found on the [Postman](https://famstar.postman.co/workspace/Famstar~1f61ba51-e89e-4175-8dc6-97e87ac306fb/collection/9794862-0ecff37b-4f22-4318-a21a-4f5987333585?action=share&creator=9794862).
