/**
 * TweetController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  'new' : function (req, res) {
    res.view();
  },

  'create' : function (req, res, next){
    console.log(req.params.all());
    var params = req.params.all();
    params.tweetBy = req.session.user.name + ' @' + req.session.user.userid;
    Tweet.create(params, function tweetCreated(err, tweet){
      console.log('Tweet by', req.session.user.name, '@' + req.session.user.userid)
      if(err) {
        req.session.flash = {
          err: err
        }
        return res.redirect('tweet/new')
      }
      //tweet.tweetBy = req.session.user.name + ' @' + req.session.user.userid;
      //res.json(user);
      //req.session.flash = {}
      res.redirect('/tweet/show/'+tweet.id);
      console.log('new tweet created')
    });
  },

  'show' : function (req, res, next){
    Tweet.findOne(req.param('id'), function foundUser(err, tweet) {
      if(err)  return next(err);
      if(!tweet) return next();
      res.view({
        tweet: tweet
      });
    })
  },

  index: function (req, res, next){
    Tweet.find(function foundTweets(err, tweets){
      if(err) return next(err);
      res.view({
        tweets: tweets
      })
    })
  },

  /**
   * Action blueprints:
   *    `/tweet/create`
   */
  //  create: function (req, res) {
    
  //   // Send a JSON response
  //   // Tweet.create({
  //   //   tweetBy: req.user
  //   // })
  //   console.log(req.session.user)

  //   return res.json({
  //     hello: 'world'
  //   });
  // },


  /**
   * Action blueprints:
   *    `/tweet/retweet`
   */
   retweet: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/tweet/favorite`
   */
   favorite: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/tweet/reply`
   */
   reply: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TweetController)
   */
  _config: {}

  
};