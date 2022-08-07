require('dotenv').config();

const fetch = require('node-fetch');


exports.login = async (req, res, next) => {

	res.render('login', {
		layout: 'login'
	});
}

exports.signUp = async (req, res, next) => {
	

	try {
		console.log(req.body);
		session=req.session;
		const body = {
			email : req.body.email,
			password : req.body.password
		};
		const response = await fetch(process.env.AUTH_URL +'/users/auth-dashbord', {
			method: 'post',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	
	
		const data = await response.json();
	
		console.log(data);
	
		const d = Object.assign(data);
	
		if (d.statusCode == 200) {
			const da = Object.assign(d.data);
			session.usertoken = da.token;
			session.auth = true;
			req.session = session;
			return res.redirect('/dashbord');
		}
		res.redirect('users/login')
	} catch (error) {	
		console.log(error);
		res.send('users/login')
	}
	
}