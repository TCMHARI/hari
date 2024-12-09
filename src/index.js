import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { initDatabase, getAllMembers, addMember, getMemberById, updateMember, deleteMember } from './db.js';
import { Parser } from 'json2csv';
import fs from 'fs';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.resolve('public')));

// to fetch index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

let members = [];
let currentId = 1;