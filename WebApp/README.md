npm i
npm start

use localhost:3000/controller and localhost:3000/project
## Tests
`npm test` to run
UNIT TESTS run small pieces of code from fewer files, so it is sensible to have unit test files next to the code. 

e.g. App.tsx should have App.unit.test.tsx in same folder.

INTEGRATION TESTS run more code from more files, so it is sensible to place integration tests in a \_\_test\_\_ folder. 

e.g. \_\_test_\_/integration_tests/events.integration.test.tsx

END TO END TESTS
consider using Cypress or puppeteer library