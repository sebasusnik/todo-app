# CRUD operations with Fetch API and Axios library

This is a basic example of CRUD operations with Fetch API and [Axios library](https://axios-http.com/docs/intro). We will see how to use these tools to make CRUD operations with HTTP methods to a fake Rest API. 


First complete the following steps in order to run the fake API:

1) Install [JSON Server](https://www.npmjs.com/package/json-server) globaly

```
npm install -g json-server
```


2) Run JSON Server on port 5555

```bash
json-server -w -p 5555 db.json
```

The data can be modify on `db.json` file, changes will update in real time.