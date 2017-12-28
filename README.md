# passport-local-session

This is example for passport local stratege usage in ExpressJS

## Download & run

I have 3 branch of this example for;
 - **master**: plain text username & password
 - **bcrypt**: encrypt password by bcrypt
 - **mongolocal**: use passport-mongoose-local

After git clone, install required packages by npm,

```sh
npm install
```

then prepare mongodb and run server of example project.

```sh
$ PORT=3000 DB_USERNAME='mongo' DB_PASSWORD='PW' DB_SERVER='localhost' DATABASE='student' node server.js
```

