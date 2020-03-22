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
* Log into Firebase: `npx firebase login`
* Initialize Firebase: `npx firebase init`
  * when asked, add everything
  * when asked, ⚠️ DONT OVERWRITE ANYTHING ⚠️
* Start Firebase emulators (requires Java): `npx firebase emulators:start`
* Navigate to `http://localhost:5000` if the site appears, you should be good.

Making and deploying changes:
---
* Edit files in `public` or `src` folders
* `npm run babel`
* `npx firebase deploy`
* (that's it)
