import express from "express";

const resumeRouter = express.Router();

resumeRouter.post('/create', prote);
resumeRouter.delete('/delete/:resumeId', deleteResume);
resumeRouter.get('/get/:resumeId', getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);
resumeRouter.put('/update', updateResume);

export default resumeRouter