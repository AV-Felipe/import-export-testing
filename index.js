// neste arquivo estamos recebendo a pesquisa do front pelo método post

const express = require('express');

const app = express();

const fs = require('fs'); // this is a commonJS syntax it is equivalent to ES6 import * as fs from 'fs'
//nodejs v9 and under lack the suport for the ES6 syntax, but newer versions do
//for using de ES6 syntax, we must add a "type": "module", line to our package.json (or use .mjs extension) file and change all require
//statements and other code from commonjs syntax to ES6 syntax

const port = process.env.PORT || 3000;

// MOCK DB FILE
//the require aproach only reads the file once, then caches it
//const data = require('./mock_data.json');

// enable the middleware for serving static files
//by using this aproach we will serve all static files in the provided path argument
app.use(express.static('pages')); //pages is the name of the directory where the files to be served are located, this will be the root route (/)

app.use(express.json());


// GET response
app.get('/database', (req, res)=>{
	fs.readFile('mock_data.json', 'utf8', (err, jsonString)=>{

		//caso não consiga ler o arquivo, loga um erro no console
		if(err){
			console.log('file read failed: ', err);
			return;
		}

		//envia a string do arquivo na resposta
		try {
			res.send(jsonString);
			//const sales = JSON.parse(jsonString);
			//console.log('nome do cliente: ', sales[0].customer);
			
		}catch (err){
			console.log('error parsin json string: ', err);
		}
	})
})

//POST response
app.post('/database', (req, res)=>{
	
	let newInvoice = req.body;

	fs.readFile('mock_data.json', 'utf8', (err, jsonTextFile)=>{

		//caso não consiga ler o arquivo, loga um erro no console
		if(err){
			console.log('file read failed: ', err);
			return;
		}

		//tenta converter o json para um objeto, caso falhar, loga um erro sem quebrar a aplicação
		try {
			
			const jsonFileObject = JSON.parse(jsonTextFile);
			jsonFileObject.push(newInvoice);

			const jsonWithNewString = JSON.stringify(jsonFileObject)
			fs.writeFile('./mock_data.json', jsonWithNewString, err=>{
				if(err){
					console.log('Error writing file, ', err);
				}else{
					console.log('successfully wrote file');
				}
			})

			//console.log('nome do cliente: ', jsonFileObject[0].customer);
			
		}catch (err){
			console.log('error parsin json string: ', err);
		}
	})
})


// custom 404 page
app.use((req, res) => {
	res.type('text/plain')
	res.status(404)
	res.send('404 - Not Found')
})

// custom 500 page
app.use((err, req, res, next) => {
	console.error(err.message)
	res.type('text/plain')
	res.status(500)
	res.send('500 - Server Error')
})

app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`))
