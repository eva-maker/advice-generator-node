# Advice Generator — JavaScript Project

A small Node.js application that fetches random advice from the **Advice Slip API**  
and saves the received data into a local JSON file.

This project demonstrates API requests, JSON processing, and simple file handling in Node.js.

---

## Features

- Sends a GET request to the Advice Slip API  
- Receives and parses a JSON response  
- Displays a random piece of advice in the console  
- Saves the full API response into `output.json`  
- Clean and minimal node-based structure

---

## Tech Stack

- **Node.js**
- **HTTPS module (`https`)**
- **File System module (`fs`)**
- **Git / GitHub**

---

## Project Structure
```
advice-generator-node/
│── index.js      # Main script sending API request
│── output.json   # Saved API response
│── .gitignore  
│── README.md
```
---

## How to Run

### 1. Install Node.js  
Make sure Node.js is installed on your machine:  
https://nodejs.org/

### 2. Run the script
```
node index.js
```
Example Output
```
Advice of the day: "Don't compare yourself to others."
✔ Saved to output.json
```
API Used
Advice Slip JSON API
https://api.adviceslip.com/

Author: Yeva Bykova

GitHub: https://github.com/eva-maker

---
