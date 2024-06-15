// Importing the model created
import {model} from './../models/login.js';
import {messagemodel} from './../models/messages.js';

// Defining the services used for the application

// Save service used to poast the data to the database
export const save = (newUser) => {

    const user = new model(newUser);
    return user.save();

}

export const findAUser = async(email) => {
    try{
    const user = await model.findOne({userEmail: email});
    return user;
    }catch(error){
        return "service failure"
    }
}

export const findCards = async(role) => {
    try{
    const user = await model.find({role: role});
    return user;
    }catch(error){
        return "service failuer"
    }
}

export const update = async (updatedTask) => {


    const task = await  model.findOneAndUpdate({userEmail:updatedTask.userEmail}, updatedTask).exec();
    return task;

}

export const addMatch = async (userEmail, swippedUserEmail) => {


    const task = await  model.findOneAndUpdate({userEmail:userEmail}, {$push: {matches: {userEmail: swippedUserEmail}} }).exec();
    return task;

}

export const removeUser = async (email) => {
    const deletedUser = await model.deleteOne({userEmail: email}).exec();
    return deletedUser;
}


export const postMessage = (newMessage) => {

    const message = new messagemodel(newMessage);
    return message.save();

}

export const getMessage =async (fromEmail, toEmail) => {
    try{
        const user = await messagemodel.find({from_emailId:fromEmail,to_emailId:toEmail});
        return user;
        }catch(error){
            return "service failure"
        }
    
}

export const getMatches = async (pipeline) => {


    const task = await  model.aggregate(pipeline).exec();
    return task;

}
