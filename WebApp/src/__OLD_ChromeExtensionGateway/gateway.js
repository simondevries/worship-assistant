/*global chrome*/
// The ID of the extension we want to talk to.
var editorExtensionId = 'pjebobcelilglngphefhlpdlhohhjapa';

export const changeTab = (url) => {
  chrome.runtime.sendMessage(
    editorExtensionId,
    { focusUrl: url },
    function (response) {
      var result = response().then((res) =>
        console.log(JSON.strisimonngify(res)),
      );
      if (!result.success) console.log('failed to send');
      if (result.success) console.log('sent');
    },
  );
};

export const playVideo = (url) => {
  chrome.runtime.sendMessage(
    editorExtensionId,
    { playVideo: url },
    function (response) {
      var result = response().then((res) =>
        console.log(JSON.stringify(res)),
      );
      if (!result.success) console.log('failed to send');
    },
  );
};

export const pauseVideo = (url) => {
  chrome.runtime.sendMessage(
    editorExtensionId,
    { pauseVideo: url },
    function (response) {
      var result = response().then((res) =>
        console.log(JSON.stringify(res)),
      );
      if (!result.success) console.log('failed to send');
    },
  );
};
