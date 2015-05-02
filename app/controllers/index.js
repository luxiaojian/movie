var Movie = require('../models/movie');

exports.index = function(req, res) {
    Movie.fetch(function(err,movies){
      if(err){
        console.log(err);
      }
      res.render('index', { 
        title: '网站首页',
        movies: movies,
      });
    })
  };