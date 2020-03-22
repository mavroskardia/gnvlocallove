
function getdb() {
  let db = firebase.firestore();
  if (location.hostname === "localhost") {
    db.settings({
      host: "localhost:8080",
      ssl: false
    });
  }
  return db;
}