// western_01.js - Find Western movies, sorted by title, and return the first 3
import { MongoClient } from 'mongodb';
import { exit } from 'node:process';

// Replace with your actual connection string (e.g., from MongoDB Atlas)
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db = await client.db('sample_mflix');
const collection = db.collection('movies');


const result = await collection.aggregate([
  {
    $match: {
      genres: "Western"
    }
  },
  {
    $sort: {
      title: 1
    }
  },
  {
    $limit: 12
  },
  {
    $project: {
      _id: 0,
      title: 1,
      cast: 1
    }
  }
]).forEach(element => {
    console.log(element);
});
await client.close();
exit(0); 
