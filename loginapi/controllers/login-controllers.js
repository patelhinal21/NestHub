// Controller JS file used for the application

import { request, response } from "express";
import { set } from "mongoose";
import * as loginService from './../services/login-services.js';
import { model, validate } from "./../models/index.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';



// Success response function
const setSuccessResponse = (obj, response) => {

    response.status(200);
    response.json(obj);

}
// Error response function
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

// Function used for posting sign up data  
const post = async (request, response) => {

    try {
        const payload = request.body;
        const { error } = validate(request.body);
        if (error)
            return response.status(400).send({ message: error.details[0].message });

        const user = await loginService.findAUser(payload.userEmail);
        if (user)
            return response.status(409).send({ message: "User Email already exists" });
        const login = await loginService.save(payload);

        setSuccessResponse(login, response);
    } catch (error) {
        setSuccessResponse.apply(error, response);
    }
}

// Function used for posting message for chat feature
const messagepost = async (request, response) => {
    try {
        const payload = request.body;
        const login = await loginService.postMessage(payload);
        setSuccessResponse(login, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

// Function used for posting user data after signup
const postLogin = async (request, response) => {
    try {
        const payload = request.body;
        const user = await loginService.findAUser(payload.userEmail);
        if (!user) {
            return response.status(401).send({ message: "Invalid email id or password!" });
        }
        else {

            const unhashedPass = await bcrypt.compare(payload.userPassword, user.userPassword);
            if (!unhashedPass) {
                return response.status(401).send({ message: "Invalid email id or password!" });
            } else { }
            setSuccessResponse(user, response);
        }

    } catch (error) {
        setErrorResponse(error, response);
    }
}

// Function used for getting all the  user data 
const getUser = async (request, response) => {

    try {

        const email = request.params.email;
        const user = await loginService.findAUser(email);

        setSuccessResponse(user, response);


    } catch (error) {
        setErrorResponse(error, response);
    }

}
// Function used for getting details on card after matches
const getCards = async (request, response) => {

    try {

        const role = request.params.role;
        const user = await loginService.findCards(role);

        setSuccessResponse(user, response);


    } catch (error) {
        setErrorResponse(error, response);
    }

}
// Function used for posting sign up data 
const createUser = async (request, response) => {
    try {
        const payload = request.body;


        const uniqueID = uuidv4();
        const userEmail = payload.userEmail;
        const userPassword = payload.userPassword;
        const hashedPass = await bcrypt.hash(userPassword, 10);
        const lowerEmail = userEmail.toLowerCase();

        const saveData = {

            uniqueID: uniqueID,
            userEmail: lowerEmail,
            userPassword: hashedPass

        }


        const user = await loginService.findAUser(payload.userEmail);
        if (user) {
            return response.status(409).send({ message: "User Email already exists" });
        } else {


            const login = await loginService.save(saveData);


            response.status(201).json({ email: lowerEmail, uniqueID: uniqueID })
        }
    } catch (error) {
        setErrorResponse(error, response);
    }
}

// Function used for updating user details
export const updateUser = async (request, response) => {

    const formData = request.body.formData

    try {

        const email = request.params.email;
        const update = { ...request.body };
        const login = await loginService.update(update);
        const updatedUser = await loginService.findAUser(email);

        setSuccessResponse(updatedUser, response);

    } catch (error) {
        setErrorResponse(error, response);
    }

}
// Function used for deleting user details
export const deleteUser = async (request, response) => {


    try {

        const email = request.params.email;


        const deletedUser = await loginService.removeUser(email);
        setSuccessResponse(deletedUser, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const addMatch = async (request, response) => {



    try {

        const userEmail = request.params.userEmail
        const swippedUserEmail = request.params.swippedUserEmail



        const addMatch = await loginService.addMatch(userEmail, swippedUserEmail);

        setSuccessResponse(addMatch, response);

    } catch (error) {
        setErrorResponse("MATCH ERROR", response);
    }

}

// Function used for getting match details
const getMatches = async (request, response) => {

    try {

        const email = request.body;



        const pipeline = [
            {
                '$match': {
                    'userEmail': {
                        '$in': email
                    }
                }
            }
        ]
        const user = await loginService.getMatches(pipeline);
        setSuccessResponse(user, response);


    } catch (error) {
        setErrorResponse(error, response);
    }

}

// Function used for getting chat history on chat feature
const getMessages = async (request, response) => {

    try {

        const fromEmail = request.params.fromEmail;
        const toEmail = request.params.toEmail;
        const user = await loginService.getMessage(fromEmail, toEmail);

        setSuccessResponse(user, response);


    } catch (error) {
        setErrorResponse(error, response);
    }

}

export default {
    post: post,
    postLogin: postLogin,
    createUser: createUser,
    updateUser: updateUser,
    getUser: getUser,
    deleteUser: deleteUser,
    getCards: getCards,
    messagepost: messagepost,
    getMessages: getMessages,
    addMatch: addMatch,
    getMatches: getMatches,

};



