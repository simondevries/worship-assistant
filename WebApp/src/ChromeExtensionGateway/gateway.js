/*global chrome*/
// The ID of the extension we want to talk to.
var editorExtensionId = 'idellhgacokfnmoagafaafnndbahoajf';

export const changeTab = (url) => {
  chrome.runtime.sendMessage(
    editorExtensionId,
    { focusUrl: 'https://reactrouter.com/web/guides/quick-start' },
    function (response) {
      // var result = await response();
      // response.then((res) => console.log(JSON.stringify(res)));
      // if (!result.success) console.log('failed to send');
    },
  );
};

export const startVideo = (url) => {
  chrome.runtime.sendMessage(
    editorExtensionId,
    { openFile: 'file:///C:/Users/simon/Videos/South Island.mp4' },
    function (response) {
      // var result = await response();
      // response.then((res) => console.log(JSON.stringify(res)));
      // if (!result.success) console.log('failed to send');
    },
  );
};
