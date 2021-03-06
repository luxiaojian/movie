var Movie = require('../models/movie');
var Catetory = require('../models/catetory');
var Comment = require('../models/comment');
var _ = require('underscore');
// 详情页
exports.detail = function(req, res) {
  var id = req.params.id;
  Movie.findById(id,function (err,movie){
      Comment
      .find({movie:id})
      .populate('from','name')
      .populate('reply.from reply.to','name')
      .exec(function(err,comments){
        console.log(comments);
        res.render('detail', {
          title: '网站详情页'+ movie.title,
          movie: movie,
          comments: comments
          });
        })
  })
}

exports.new = function(req, res) {
  Catetory.find({},function(err,catetories){
    res.render('admin', {
      title: '网站后台录入页',
      catetories: catetories,
      movie:{}
    });
  });
};

exports.save = function (req,res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if(id){
    Movie.findById(id, function (err,movie){
      if(err){
        console.log(err);
      }
      _movie = _.extend(movie,movieObj);
      _movie.save(function (err,movie){
        if(err){
          console.log(err);
        }
        res.redirect('/movie/' + _movie.id)
      })
    })
  }else{
        _movie= new Movie(movieObj);
        var catetoryId = _movie.catetory;

        _movie.save(function (err,movie){
          if(err){
            console.log(err);
          }
          if(catetoryId){
            Catetory.findById(catetoryId,function(err,catetory){
              catetory.movies.push(movie._id);
              catetory.save(function(err,catetory){
                res.redirect('/movie/' + _movie.id);
              })
            })
          }
        });
      }
}

exports.update = function (req,res){
  var id = req.params.id;

  if(id){
    Movie.findById(id,function (err,movie){
      Catetory.find({},function(err,catetories){
        res.render('admin',{
          title: '后台更新页面',
          movie: movie,
          catetories: catetories
        });
      });
    });
  }
}
// 后台录入页面
exports.list = function (req, res) {
  Movie.fetch(function (err,movies){
    if(err){
      console.log(err);
    }
    res.render('list', {
      title: '列表页',
      movies: movies
    });
  });
}

exports.delete = function(req,res){
  var id = req.query.id;
  if(id){
    Movie.remove({_id: id}, function(err,movie){
      if(err){
        console.log(err);
      }else{
        res.json({success:1});
      }
    })
  }
}
