# Simple Database with Node.js

_Created for Gray Area's [Creative Code Intensive](https://grayarea.org/creative-code-intensive). Last updated for fall 2025._

This project includes a Node.js server script and a web page that connects to it.
It just serves static files stored in the project's public folder.
Note that all other code outside of this folder (e.g. what's in server.js) is not visible to the general public.
Unlike front-end JavaScript, back-end code is not sent to the browser.
Instead, back-end code can be used to generate pages and responses to send to a browser (client) in response to specific requests.

[Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript.
This project uses the [Express](https://expressjs.com/) framework.

## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript.
If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `public/style.css`: The styling rules for the pages in your site.

← `public/client.js`: The JavaScript for the site's front-end. This is the JavaScript that will run in the user's (client's) web browser.

← `public/index.html`: This is the main index for the site. In other Glitch examples, you may see HTML templates with libraries like Handlebars instead of an index.html

← `server.js`: The **Node.js** server script for your new site. In this template, we just use this to serve files, but we'll build on this in other examples.

← `package.json`: The NPM packages for your project's dependencies.

## Originally built on Glitch

[Glitch](https://glitch.com) was a friendly community where people shared and hosted creative websites. Glitch shut down in summer 2025.
Some of the text in this file is adapted from their node start project README.
