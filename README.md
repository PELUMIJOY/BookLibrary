# week-9-task-node-sq011B

# Task

# 1. NO_SQL

### Implement this task using MongoDB

### Clarification
- Convert your week-6 task database into a NOSQL DB using `MONGODB`.
- Implement all functionalities as in the previous tasks
- Implement pagination with limit of 5 values for each page`
- Create Authentication and Authorization  using a middleware function
- Implement Validation for incoming request using  **Joi or Zod**
- Only registered users can access all `endpoints`
- Containerize the app.
- Use mongoDB-compass for local development

### Test Coverage (Test is mandatory. No tests equals zero(0) marks):
- Test your database using mongodb-memory-server
- Test all endpoints `(GET, POST, PUT, DELETE)`

### Hosting
- Host your application on Heroku

### Documentation
- document your API with postman


# 2. Mongo Aggregation Exercise.
- Go through the readme file in the Folder `MongoAggregation`

//Get the details from the req.body
    //Validate the email, If error, send an error message. Otherwise
    //Check if that email already exists in ur db, if it does, send a message that the email is already in use,  
    //If the email does not exist, Generate Salt and hash password
    //Create the user
    //Return a success response
