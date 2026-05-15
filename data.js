// app.js
import { MongoClient } from 'mongodb';
import fs from 'fs';
import readline from 'readline';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function runQuery(choice) {
    console.log("Inside runQuery:", choice);

    const db = client.db('sample_mflix');
    const movies = db.collection('movies');
    const comments = db.collection('comments');

    let result = [];
    let filename = '';

    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }

    if (choice === '0') {
        console.log("Program ended.");
        rl.close();
        await client.close();
        return;
    }

    switch (choice) {
        case '1':
            filename = './data/data1.json';
            result = await movies.aggregate([
                {
                    $match: {
                        genres: "Comedy",
                        "tomatoes.viewer.rating": { $lt: 4.1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        year: 1,
                        genres: 1,
                        "tomatoes.viewer.rating": 1
                    }
                }
            ]).toArray();
            break;

        case '2':
            filename = './data/data2.json';
            result = await movies.find(
                { cast: "Faye Dunaway" },
                {
                    projection: {
                        _id: 0,
                        title: 1,
                        year: 1,
                        cast: 1
                    }
                }
            ).toArray();
            break;

        case '3':
            filename = './data/data3.json';
            result = await movies.find(
                { year: { $in: [1962, 2016] } },
                {
                    projection: {
                        _id: 0,
                        title: 1,
                        year: 1
                    }
                }
            ).toArray();
            break;

        case '4':
            filename = './data/data4.json';
            result = await movies.aggregate([
                { $match: { "awards.wins": { $gt: 0 } } },
                { $sort: { "awards.wins": -1 } },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        year: 1,
                        awards: 1
                    }
                }
            ]).toArray();
            break;

        case '5':
            filename = './data/data5.json';
            result = await movies.aggregate([
                { $match: { genres: "Western" } },
                { $match: { genres: "Comedy" } },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        year: 1,
                        genres: 1
                    }
                }
            ]).toArray();
            break;

        case '6':
            filename = './data/data6.json';
            result = await comments.aggregate([
                {
                    $group: {
                        _id: "$movie_id",
                        commentCount: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        commentCount: { $gte: 5 }
                    }
                },
                {
                    $lookup: {
                        from: "movies",
                        localField: "_id",
                        foreignField: "_id",
                        as: "movie"
                    }
                },
                { $unwind: "$movie" },
                {
                    $project: {
                        _id: 0,
                        title: "$movie.title",
                        year: "$movie.year",
                        commentCount: 1
                    }
                }
            ]).toArray();
            break;

        default:
            console.log("Invalid selection.");
            askMenu();
            return;
    }

    fs.writeFileSync(filename, JSON.stringify(result, null, 2));

    console.log(`Saved: ${filename}`);
    console.log(`Total Results: ${result.length}`);

    askMenu();
}

function askMenu() {
    console.log(`
========================================
MongoDB Assignment 3
========================================
1. Find all comedy movies with tomatoes rating below 4.1
2. Find all movies where Faye Dunaway is in the cast
3. Find all movies where the year is 1962 or 2016
4. Find all movies that have won awards
5. Find all movies that are both Western and Comedy
6. Find all movies that have 5 or more comments
0. Exit
========================================
`);

    rl.question('Select query number: ', async (answer) => {
        await runQuery(answer.trim());
    });
}


console.log("Current folder:", process.cwd());

await client.connect();
askMenu();