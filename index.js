import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import UserController from './src/controllers/user.controller.js';
import JobsController from './src/controllers/jobs.controller.js';
import upload from './src/middlewares/uploadMiddleware.js';
import { validateJobApplication, validateLogin } from './src/middlewares/formValidation.js';
import { sessionCheck } from './src/middlewares/sessionManagement.js';


const app = express();

app.use(session({
    secret: 'tejas', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(sessionCheck);
// Serve resumes from the "public/resumes" directory
app.use('/resumes', express.static('public/resumes'));

// Get the directory name of the current module for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the views directory using the path module for cross-platform compatibility
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(expressEjsLayouts)
app.set('layout', 'layout')

const uc = new UserController();
const jc = new JobsController();

app.get('/', uc.renderHome)
app.get('/jobs', jc.getJobs)
app.get('/jobs/:id', jc.getJobDetails)
app.post('/jobs/:id', upload.single('resume'), validateJobApplication, jc.submitJob)
app.get('/login', uc.renderLogin)
app.post('/login', validateLogin, uc.postLogin)
app.get('/logout', uc.logoutUser)
app.post('/register', uc.registerUser)
app.get('/postjob', jc.postJob);
app.post('/postjob', jc.addJob)
app.get('/deletejob/:id', jc.dltJob)
app.get('/editjob/:id', jc.editJobShow);
app.post('/editjob/:id', jc.editJob);
app.get('/jobs/applicants/:id', jc.viewApplicants);

export default app;