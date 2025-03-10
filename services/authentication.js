const jwt=require("jsonwebtoken");

const secret="Rithik$Nagar";

function generatetoken(user){

    const payload={

        _id:user._id,
        email:user.email,
        fullname:user.fullname,
        role:user.role,
        profileImageURL:user.profileImageURL,
    }

    const token=jwt.sign(payload,secret);

    return token;

}

function verifytoken(token){

    const payload=jwt.verify(token,secret);
    
    return payload;

}


module.exports={
    generatetoken,verifytoken
}
