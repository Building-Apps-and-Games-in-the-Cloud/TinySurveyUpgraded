import { SurveyManager } from './helpers/surveymanagerdb.mjs';
import express from 'express';
import cookieParser from 'cookie-parser';

import {index} from './routes/index.mjs';
import {gottopic} from './routes/gottopic.mjs';
import {setoptions} from './routes/setoptions.mjs';
import {recordselection} from './routes/recordselection.mjs';
import {displayresults} from './routes/displayresults.mjs';
import {deletesurvey} from './routes/deletesurvey.mjs';
import {trackingok} from './routes/trackingok.mjs';
import {displayresultsmanage} from './routes/displayresultsmanage.mjs';
import {resetsurvey} from './routes/resetsurvey.mjs';

// Create the express application
const app = express();

// Select the middleware to decode incoming posts
app.use(express.urlencoded({ extended: false }));

// Add the cookie parser middleware
app.use(cookieParser());

// Select ejs middleware
app.set('view-engine', 'ejs');

// Connect the route handlers to the routes
app.use('/index.html', index);
app.use('/', index);
app.use('/gottopic', gottopic);
app.use('/setoptions', setoptions);
app.use('/recordselection', recordselection);
app.use('/displayresults', displayresults);
app.use('/deletesurvey', deletesurvey);
app.use('/trackingok', trackingok);
app.use('/displayresultsmanage', displayresultsmanage);
app.use('/resetsurvey', resetsurvey);

// Create a survey manager
let surveyManager = new SurveyManager();
let surveysLoaded = false;

export {surveysLoaded };

surveyManager.init().then(() => { 
  surveysLoaded = true; 
});

// Export the survey manager for others to use
export {surveyManager as surveyManager};

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server running");
})