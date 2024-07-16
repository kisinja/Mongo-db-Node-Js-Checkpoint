const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Path: models/person.js
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

// new person
const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
});

// save person
person.save((err, data) => {
    if (err) return console.error(err);
    console.log('Person saved:', data);
});

// create people
Person.create([
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Salad'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Steak', 'Pasta'] }
], (err, data) => {
    if (err) return console.error(err);
    console.log('Multiple persons created:', data);
});

// find people
Person.find({ name: 'Alice' }, (err, people) => {
    if (err) return console.error(err);
    console.log('People with name Alice:', people);
});

// findOne person
Person.findOne({ favoriteFoods: 'Pizza' }, (err, person) => {
    if (err) return console.error(err);
    console.log('Person who likes Pizza:', person);
});

// findById person
const personId = '';
Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found by ID:', person);
});

// find person by name
const person2Id = '';
Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
    });
});

// find person by name and update
const personName = 'Alice';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log('Person updated:', updatedPerson);
});

// find person by ID and remove
const person3Id = '';
Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Person removed:', removedPerson);
});

// remove people with name Mary
const query = { name: 'Mary' };
Person.remove(query, (err, result) => {
    if (err) return console.error(err);
    console.log('Persons removed:', result);
});


Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, people) => {
        if (err) return console.error(err);
        console.log('People who like burritos:', people);
    });
