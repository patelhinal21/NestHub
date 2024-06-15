import loginRouter from './login-routes.js';
export default (app) => {

    app.use('/', loginRouter);

}