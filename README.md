To start the database, make sure that the docker is running
Then write the command

_**npm run db:dev:up**_

It will create the container for the docker and run it.

Then to make migration through Prisma use

**_npm run dev:migration_**

and to deploy the migration run

_**npm run prisma:dev:deploy**_

It will make the changes to the database
To run the Prisma studio to see the database run

_**npm run prisma:studio**_

To restart the docket instance run

_**npm run db:dev:restart**_


To run the application 

_**npm run dev**_

It will launch the application on localhost:3000
