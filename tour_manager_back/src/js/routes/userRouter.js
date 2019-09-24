import express from 'express';
import User from '../models/user';
import auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/user/signup', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }catch(e){
        res.status(500).send(e.stack);
    }
});

userRouter.post('/user/login', async (req, res) => {

    try{
        const user = await User.validateLogin(req.body.username, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ token });
    }catch(e){
        res.status(400).send({ error: e.message });
    }

});

userRouter.post('/user/logout', auth, async(req, res) => {
    const user = req.user;

    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send('Successful logout!');
    }catch(e){
        res.status(400).send({ error: 'Error logging out!' });
    }

});

export default userRouter;
