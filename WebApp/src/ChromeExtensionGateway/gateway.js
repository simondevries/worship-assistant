/*global chrome*/
// The ID of the extension we want to talk to.
var editorExtensionId = 'idellhgacokfnmoagafaafnndbahoajf';

export const changeTab = (url) => {
  console.log('v4', url);
  chrome.runtime.sendMessage(
    editorExtensionId,
    { focusUrl: url },
    function (response) {
      // var result = await response();
      // response.then((res) => console.log(JSON.stringify(res)));
      // if (!result.success) console.log('failed to send');
    },
  );
};

export const startVideo = (url) => {
  console.log('v3', url);
  chrome.runtime.sendMessage(
    editorExtensionId,
    { openFile: url },
    function (response) {
      var result = response().then((res) =>
        console.log(JSON.stringify(res)),
      );
      if (!result.success) console.log('failed to send');
    },
  );
};
