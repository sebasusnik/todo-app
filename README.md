# CRUD operations with Fetch API and Axios library

This is a basic example of CRUD operations with Fetch API and Axios library. We will see how to use these tools to make CRUD operations with HTTP methods to a fake Rest API. 


First we must complete the following steps in order to run the fake API:

1) Install JSON Server globaly

```
npm install -g json-server
```


2) Start JSON Server on port 5555

```bash
json-server -w -p 5555 db.json
```

You can modify the to do list on `db.json` file, changes will update in real time.