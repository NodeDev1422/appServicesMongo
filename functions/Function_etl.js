exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "poc";
  var collName = "data";

  // Get a collection from the context
  var collection = await context.services.get(serviceName).db(dbName).collection(collName);

  var findResult;
  
    //insert data
  let prodIns = await collection.insertOne( { 'compliance': "true",  $setOnInsert: { time: new Date() } } );
  
  
  const pipeline = [
  { "$project": {
       compliance:1
  }  },
];
return collection.aggregate(pipeline).toArray()
  .then(customers => {
    console.log(`Successfully grouped purchases for ${customers.length} customers.`)
    return customers
  })
  .catch(err => console.error(`Failed to group purchases by customer: ${err}`))
  
  
 /* try {
    // Get a value from the context (see "Values" tab)
    // Update this to reflect your value's name.
  /*  var valueName = "value_name";
    var value = context.values.get(valueName);

  


    // Execute a FindOne in MongoDB 
    findResult = await collection.findOne(
      { owner_id: context.user.id, "fieldName": value, "argField": arg},
    );

  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }*/

  // To call other named functions:
   var result = await context.functions.execute("crud","env123456", "AWS");

 // return { result: findResult };
  return "Success ETL"+result;
};