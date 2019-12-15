async function run() {
}

function validate() {
}

run()
  .then(validate)
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
