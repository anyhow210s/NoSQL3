# NoSQL Assignment 3

## Overview

This project uses the `sample_mflix` MongoDB dataset with Node.js and MongoDB queries.

The assignment requirements included:

* Restoring the `sample_mflix.archive` database
* Running MongoDB queries using Node.js
* Exporting query results into JSON files
* Saving all outputs inside the `data` folder

---

# Setup

## Clone Repository

```bash
git clone https://github.com/jeffmlpsi/nosql-class.git
```

## Restore MongoDB Database

```bash
mongorestore --archive=sample_mflix.archive
```

## Verify Node.js and NPM

```bash
node --version
npm --version
```

## Install MongoDB Package

```bash
npm install mongodb
```

---

# Queries Implemented

## 1. Comedy movies with tomatoes rating below 4.1

Output:

```text
data/data1.json
```

---

## 2. Movies where Faye Dunaway is in the cast

Output:

```text
data/data2.json
```

---

## 3. Movies where the year is 1962 or 2016

Output:

```text
data/data3.json
```

---

## 4. Movies that have won awards

Output:

```text
data/data4.json
```

---

## 5. Movies that are both Western and Comedy

Output:

```text
data/data5.json
```

---

## 6. Movies that have 5 or more comments

Output:

```text
data/data6.json
```

---

# Running the Application

Run the Node.js application:

```bash
node app.js
```

The application displays a menu and automatically saves query results into the `data` folder.

---

# Repository Structure

```text
NoSQL3/
├── app.js
├── package.json
├── README.md
├── data/
│   ├── data1.json
│   ├── data2.json
│   ├── data3.json
│   ├── data4.json
│   ├── data5.json
│   └── data6.json
```

---

# GitHub Repository

Add your repository link here:

```text
https://github.com/anyhow210s/NoSQL3
```

---

# Comments

This assignment demonstrates the use of:

* MongoDB queries
* Aggregation pipelines
* Node.js MongoDB driver
* JSON output generation
* File system operations with Node.js
