const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const signUpTemplateCopy = require('../models/SignUpModels')


router.post('/signup',async (req,res) => {	
	// generate salt to hash password
    const salt =  await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);
	
	const signedUpUser = new signUpTemplateCopy({
	fullName:req.body.fullName,
	username:req.body.username,
	email:req.body.email,
	password:password
		})
		
		signedUpUser.save()
			.then(data =>{
				res.json(data)
			})
			.catch(error => {
				res.json(error)
			})
})



router.post('/signin', async (req, res) => {
  console.log(req.body.email);  
  const signinUser = await signUpTemplateCopy.findOne({
    email: req.body.email
  });
 
 console.log(signinUser);
 
  
  if (signinUser) {
const validPassword = await bcrypt.compare(req.body.password,signinUser.password);
	  
	  if(validPassword)
	  {
const token = jwt.sign({_id:signinUser._id,date:signinUser.data},'ilife',{expiresIn:'2d'});


const {_id,firstName,fullName,email } =signinUser;


res.status(200).json({
					token,
						user:{_id,firstName,fullName,email}
					});
					

/*res.send({
      _id: signinUser._id,
      fullName: signinUser.fullName,
      email: signinUser.email,
	  token:token
    });
	*/

	  }	
	  else
	  {
		res.status(401).send({ message: 'Invalid Password' });
	  }	

	  
  
  
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
  
  
});




router.get("/initialdata",async (req,res) => {
	var findData = await signUpTemplateCopy.find();
	res.status(200).json({
					values:findData
						
					});

})

router.get("/signout", (req,res) => {
res.status(200).json({
    message: "Signout successfully...!",
  });
})

module.exports = router