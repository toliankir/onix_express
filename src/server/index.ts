import http from 'http';
// const events = require('./events');
import app from './server';
import events from './events';

const port: number = app.get('port');
events.bind(http.createServer(app).listen(port), port);
