import React from 'react';

const tourSteps = [
  {
    content: (
      <div>
        <h1>Welcome</h1>
        Hi, thanks for offering to help with testing! <br />I have
        setup this tour instructions to guide you and prompt you for
        feedback. It would be great if you could use{' '}
        <a
          href="https://www.loom.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.loom.com/
        </a>{' '}
        to record your screen and audio so I can hear your thoughts
        but no worries if not - also feel free to skip
        sections/questions:) You can click through the steps here, to
        reopen this tour click the blue tour button on the bottom
        right of the screen.{' '}
        <b>
          The point is to get feedback on your <b>overall</b> feel for
          the app, not to find bugs... I am aware of many of them
        </b>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h1>App Background</h1>
        This app exists to provide a free app for church and other
        organisations to project from. It's trying to provide a
        lightweight solution to get churches up and running -
        especially in third world countries where the licensing fees
        of existing apps licensing fees cost a lot in local currency
        (EasyWorship costs one month of an average persons salary in
        India). Some key features are:
        <ul>
          <li>Quick and easy to setup and get running</li>
          <li>
            Content uploaded to the app is stored locally one the
            computer, it does not get uploaded to any server
          </li>
          <li>
            It's targeting small-mid sized congregations without
            overly complex requirements
          </li>
          <li>
            Leverages the benefits of web technologies (first web
            version of a projection app) such as; integrating with
            third parties (i.e. YouTube), cross platform
            compadability, utilize some cool web tools like Chrome
            Cast
          </li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h1>Add song</h1>
        Lets get started! Why not try creating your first song and
        projecting it to another screen? <br />
        <b>
          'See a victory' by elevation worship is quite popular at the
          moment, why not try add that?
        </b>
        <br />
        For projecting at church you'd need to be extending screens -
        you can use a second monitor if you have one or just move the
        projector window to the side/background. If you get stuck
        there are tips on the next slide You're going to need to
        google the song lyrics.
      </div>
    ),
  },
  {
    content: (
      <div>
        <small>
          <i>Tips from previous slide:</i>
          <ul>
            <li>
              Did you find the 'Open new monitor window' button? That
              would have opened a new tab that you could have moved
              into position of your external monitor
            </li>
            <li>
              Ensure you have the verse or chorus tags '[v1]' in the
              song to break it up
            </li>
            <li>
              The projector screen is just another chrome window that
              you can move onto any extended desktop.
            </li>
          </ul>
        </small>
        How was that experience? What do you think of the search bar?
        The idea is you could search for anything, even lyrics in a
        song or a bible verse
        <br />
        <b>
          Ready for the next challenge? Why not try edit that song :P
        </b>
      </div>
    ),
  },
  {
    content: (
      <div>
        <small>
          <i>
            Tip: Did you find the pencil button below the song title?
          </i>
        </small>
        <br />
        <br />
        Next up why not add a video to the slide show (Currently only
        .mp4 files work)
      </div>
    ),
  },
  {
    content: (
      <div>
        <small>
          <i>
            Tip: Did you upload an mp4 file? <br /> You can press the
            '+' button next to the song to access the search bar
          </i>
        </small>
        <br />
        <br />
        Any challenges?
        <br /> Did you find the controls easily?
        <br />
        <b>Next up try adding a bible verse</b>
      </div>
    ),
  },
  {
    content: (
      <div>
        <small>
          <i>
            Tip: You'll need to start typing the bible verse for the
            'Add bible verse' button to show up
          </i>
        </small>
        <br />
        <br />
        Was it clear the search has a bible verse feature? There is a
        placeholder text, but you might have missed it
        <b>
          <br />
          Last one! Try adding a Google slide presentation (or skip if
          you don't use google slides :) )
        </b>
      </div>
    ),
  },
  {
    content: (
      <div>
        <small>
          <i>
            Tip: Find the instructions on the add slide show dialog.
          </i>
        </small>
        <br />
        <br />
        Power Point would require the slide show to be uploaded to
        onedrive first before the embed url would work. How many of
        your power points are stored online?
        <b>
          <br />
          Nice one! Have a play around with anything else you've not
          tried yet.
        </b>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h1>Overall impressions?</h1>
        <ul>
          <li>What is your overall impression on the app?</li>
          <li>Was it intuitive?</li>

          <li>
            What do you think of horizontal layout? Could you easily
            see all the verses of the song that you could quickly
            switch to the right slide if you were projecting in
            church?
          </li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h1>Future features</h1>
        The following features are being considered for the future.
        How useful would you find them:
        <ul>
          <li>Song import and export</li>
          <li>Youtube</li>
          <li>Cast via google chrome</li>
          <li>Connect to a song database through CCLI login</li>
          <li>
            Separate projector view for stage (i.e. containing chords)
          </li>
          <li>Alerts</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div>
        <h1>Thank you</h1>
        Thanks for your help :) Legend!
        <br />
        <br /> One last thing... we're trying to think of a name, what
        about Beemer/Beamer or Pocket Lamp or any other suggestions?
        <small>
          <br />
          <b>Bonus</b> Try closing the browser and reloading this
          page, it will bring up a dialog which asks you to grant
          access to files. Why do you think it asks you this? Are you
          happy to give permission or would you be reluctant?{' '}
        </small>
      </div>
    ),
  },
];

export default tourSteps;