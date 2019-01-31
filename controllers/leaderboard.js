const User = require('../models/user');
exports.getLeaderboard =async (req,res,next) => {
    try{
        const users = await User.find().select('userName quizScore -_id')
        res.render('leaderboard', {
        user: req.user,
        title:'Leaderboard',
        path: '/leaderboard',
        users
      })
    }
    catch(error){
        console.log(error)
    }
    
}