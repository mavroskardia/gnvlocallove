# gnvlocallove
Small site to support local Gainesville businesses during the pandemic.

Setup
===
Dependencies:
---
* Java: `brew install openjdk` (don't forget to update your path too)

Steps:
---
* Clone the repo: `git clone https://github.com/mavroskardia/gnvlocallove.git`
* Enter repo dir `cd gnvlocallove`
* Install dependencies: `npm i`
* Initialize Firebase: `npx firebase init` (add everything, don't overwrite anything)
* Log into Firebase: `npx firebase login`
* Start Firebase emulators (requires Java): `npx firebase emulators:start`
* Navigate to `http://localhost:5000` if the site appears, you should be good.

Making and deploying changes:
---
* Edit files in `public` folder
* `npx firebase deploy`
* (that's it)
g