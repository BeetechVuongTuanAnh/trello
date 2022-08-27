const authRouter = require('./auth');
const userRouter = require('./user');
const projectRouter = require('./project');
const taskRouter = require('./task');
const noteRouter = require('./note');
const commentRouter = require('./comment');
const historyRouter = require('./history');


function route(app: any ){
    app.use('/api/user', userRouter);
    app.use('/api/project', projectRouter);
    app.use('/api/task', taskRouter);
    app.use('/api/note', noteRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/history', historyRouter);
    app.use('/api', authRouter);
}

module.exports = route;