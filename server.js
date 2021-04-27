// Dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Define Port
const port = 6969;
// create server
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

// Handle a web socket connection
wss.on('connection', (ws) => {
    // After making a connection. start listening for messages
    console.log('client connecting')

    // Handle
    ws.on('message', (data) => {
        // console.log(data)
        // for each client broadcast the data
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        })
    })
})

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on ${port}!`)
})
