import React from 'react';

export default class LoginPage extends React.Component {
  auth2 = undefined;
  state = {
    isSignedIn: false,
    file: '',
  };

  componentDidMount() {
    window.gapi.load('auth2', () => {
      this.auth2 = window.gapi.auth2.init({
        client_id: 'NOT TODAY HACKERZZZZ',
        apiKey: 'TRY AGAIN LATER',
        scope: 'https://www.googleapis.com/auth/drive',
      });

      window.gapi.load('signin2', function () {
        // render a sign in button
        // using this method will show Signed In if the user is already signed in
        var opts = {
          width: 200,
          height: 50,
          onSuccess: () => {
            alert('success');
          },
        };
        window.gapi.signin2.render('loginButton', opts);
      });

      window.gapi.client.load('drive', 'v2', () => alert('loaded'));
    });
  }

  onSuccess() {
    this.setState({
      isSignedIn: true,
    });
  }

  getContent() {
    if (this.state.isSignedIn) {
      return <p>hello user, you're signed in </p>;
    } else {
      return (
        <div>
          <p>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button>
          <button id="getfiles" onClick={this.makeApiCall}>
            Get files
          </button>
        </div>
      );
    }
  }

  makeApiCall() {
    console.log('make a call');
    var request = window.gapi.client.drive.files.get({
      fileId: '1uCEmrH30AI89x1IcjmIs6BPdYgl6Y_S_',
    });
    request.execute(function (resp) {
      console.log('Title: ' + resp.title);
      console.log('Description: ' + resp.description);
      console.log('MIME type: ' + resp.mimeType);
      localStorage.setItem('file', resp.thumbnailLink);
    });
  }

  render() {
    const fdoo = localStorage.getItem('file');
    return (
      <div className="App">
        <header className="App-header">
          {fdoo}
          <img src={fdoo} className="App-logo" alt="logo" />
          <h2>Sample App.</h2>

          {this.getContent()}
        </header>
      </div>
    );
  }
}
