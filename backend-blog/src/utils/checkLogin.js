import jwt from 'jsonwebtoken';

export default function (req, res, next) {
	const token = (req.headers.authorization || '').replace(/Bearer/, '').trim();

	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret');
			req.userId = decoded._id;
			next();

		} catch (err) {
			return res.status(404).json({
				message: 'Invalid token'
			})
		}
	}else{
		return res.status(403).json({
			message: 'Invalid token'
		})
	}


}