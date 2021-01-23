how to import data:
mongoimport <filename> -d <database> -c <collection> --jsonArray

$exists

// incorrect query -- does not guarantee that they are from the smae object... (?!?)
db.sports.find({ $and: [{"hobbies.title": "sports"},{"hobbies.frequency": { $gte: 3 }}]})

// correct:
db.sports.find({ hobbies: { $elemMatch: { title: "sports", frequency: { $gte: 3 }}}})

// how to add field to existing element in array:
db.sports.updateMany(
    { hobbies: { $elemMatch: { title: "sports", frequency: { $gte: 3 }}}}, //query
    { $set: { "hobbies.$.highFrequency": true }}) //sets the field 'hobbies.highFrequency" for each item that meets the query

    $ = matched array element

// decrease the frequency (by one) for all items in the array
db.sports.updateMany({age: { $gte: 30 }}, { $inc: { "hobbies.$[],frequency": -1 }})
$[]

// how to query specific items in the array:
db.sports.updateMany( 
    {}, 
    { $set: { "hobbies.$[el].goodFreqeuncy":true }},
    { arrayFilters: [{ "el.frequency": { $gt: 2 }}]})

// how to add element to array:
db.sports.udpdateMany(
    {name: "Fred"},
    { $push: { hobbies: {title:"Sleeping", frequency: 10 }}}
)
// or mulitple:
db.sports.udpdateMany(
    {name: "Fred"},
    { $push: { hobbies: { $each: [{title:"Sleeping", frequency: 10 },{title: "Sports", frequency:"2"} ], $sort: {frequency: -1} ]}}
)
// the items will be added to the array in descending frequency order (sort is optiona;l)

// remove an item from an array:
db.sports.updateOne(
    {name:"Fred"},
    { $pull: { hobbies: { title: "hiking "}}}
)
// remove the first item from the array 'hobbies' with title of 'hiking'

// remove the last item from an array:
db.sports.updateOne({name: "Joe"},{ $pop: { hobbies: 1 }}) // 1 = last element, -1 = first element

//instead of $push use $addToSet - only allows one instance (unique values only)