var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/', async function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;
	// const salt =  10;
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	const hashedPasswordConf = await bcrypt.hash(req.body.passwordConf, salt);


	console.log("salt in Register=>" + salt);
	console.log("hashedPassword in Register=>" + hashedPassword);
	console.log("hashedPasswordConf in Register=>" + hashedPasswordConf);



	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c = 1;
					User.findOne({}, function (err, data) {

						// if (data) {
						// 	console.log("if");
						// 	console("data================"+ data);
						// 	c = data.unique_id + 1;
						// }else{
						// 	c=1;
						// }

						var newPerson = new User({
							unique_id: c++,
							email: personInfo.email,
							username: personInfo.username,
							password: hashedPassword,
							passwordConf: hashedPasswordConf
						});

						newPerson.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, async function (err, data) {

		// const salt = await bcrypt.genSalt();
		const isMatch = await bcrypt.compare(req.body.password, data.password);

		console.log("isMatch in login=>" + isMatch);

		if (data) {

			// if(data.password==req.body.password){
			if (isMatch) {

				console.log("Done Login");
				req.session.userId = data.unique_id;
				console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('data.ejs', { "name": data.username, "email": data.email });
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	console.log('req.body');
	console.log(req.body);
	
	User.findOne({ email: req.body.email }, async function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				const salt = await bcrypt.genSalt();
            	const hashedPassword = await bcrypt.hash(req.body.password, salt);
            	const hashedPasswordConf = await bcrypt.hash(req.body.passwordConf, salt);

    
            	console.log("salt in Register=>" + salt);
           		console.log("hashedPassword in Register=>" + hashedPassword);
            	console.log("hashedPasswordConf in Register=>" + hashedPasswordConf);

				// data.password = req.body.password;
				// data.passwordConf = req.body.passwordConf;

				data.password = hashedPassword;
				data.passwordConf = hashedPasswordConf;

				data.save(function (err, Person) {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});

module.exports = router;