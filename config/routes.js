var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment = require('../app/controllers/comment');

module.exports = function (app){
  app.use(function(req,res,next){
    var _user = req.session.user;
    app.locals.user = _user;
    return next();
  })
  
  //Index
  app.get('/',Index.index);

  //User
  app.post('/user/signin',User.signin);
  app.get('/signin',User.showSignin);
  app.get('/signup',User.showSignup);
  app.post('/user/signup',User.signup);
  app.get('/logout',User.logout);
  app.get('/admin/userlist',User.signinRequired,User.adminRequired,User.list);
  app.post('/admin/user/list',User.signinRequired,User.adminRequired,User.delete);

  //Movie
  app.get('/movie/:id',Movie.detail);
  app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new);
  app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update);
  app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.save);
  app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
  app.post('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.delete);

  //comment
  app.post('/user/comment',User.signinRequired,Comment.save);
}