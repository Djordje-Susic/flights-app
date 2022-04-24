/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  fetch(data)
    .then(response => response.text())
    .then(
        data  => {
          postMessage(data);
        },
        // err => {
        //   throw new Error('Whoops!')
        //   postMessage({status: 'error', message:err.message});
        // }
      );

});
