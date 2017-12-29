# passport-local-session

This is examples for passport local stratege usages with ExpressJS.



## Environments

 - node.js v8
 - npm v5 above
 - passport : 
 - mongodb
 - mongoose


### Download & run

There are 3 branches:
 - **plainpassword**: plain text username & password
 - **bcrypt**: encrypt password by bcrypt
 - **mongolocal**: use passport-mongoose-local

After git clone, install required packages by npm,

```sh
npm install
```

prepare mongodb, I uses env variable for DB and run server.js.

```sh
$ PORT=3000 DB_USERNAME='mongo' DB_PASSWORD='PW' DB_SERVER='localhost' DATABASE='student' node server.js
```

