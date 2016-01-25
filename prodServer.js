const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ParaBird = require('./server/parabird');
const _ = require('lodash');
const dataMock = require('./server/dataMock');

// BASE SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://screen:screen@ds037215.mongolab.com:37215/parabird'); // connect to our database

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  console.log('>>> handle an question!uri:', req.url, ' method:', req.method);
  next();
});


const router = express.Router();

router.route('/parabirds')
  .post(function(req, res) {
    var bear = new ParaBird();
    bear.name = req.body.name;
    bear.config = req.body.config;
    bear.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'parabird created!' });
    });
  })
  .get(function(req, res){
    ParaBird.find(function(err, bears){
      if (err) res.send(err);
      res.json(bears);
    });
  });

router.route('/parabirds/:name')
  .get(function(req, res){
    ParaBird.findOne({ name: req.params.name }, (err, bear) => {
      if (err) res.send(err);
      res.json(bear ? bear.config : {});
    })
  })
  .put(function(req, res) {
    ParaBird.findOne({ name: req.params.name }, (err, bear) => {
      if (err) res.send(err);
      bear.name = req.body.name;
      bear.config = req.body.config;
      bear.save(err => {
        if (err) res.send(err);
        res.json({message: 'parabird updated!'});
      });
    })
  })
  .delete((req, res) =>
    ParaBird.remove({ name: req.params.name }, (err, bear) => {
      if (err) res.send(err);
      res.json({message: 'Successfully deleted'});
    })
  );

//根据场景id获取某个用户下的场景
router.route('/parabirds/:name/:id')
  .get(function(req, res){
    ParaBird.findOne({ name: req.params.name }, (err, result) => {
      if (err) res.send(err);
      if (result && result.config) {
        const entries = result.config.scenes.entries;
        const entry = _.find(entries, 'id', req.params.id);
        res.json(entry ? entry : {});
      } else {
        res.json({});
      }
    })
  });


//模拟图表数据
router.route('/chart/lineBar/:num')
  .get(function (req, res) {
    var num = req.params.num;
    res.json(dataMock.lineBar(num));
  });
router.route('/chart/pie/:num')
  .get(function (req, res) {
    var num = req.params.num;
    res.json(dataMock.pie(num));
  });

app.use('/api/v1', router);

app.listen(4000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:4000');
});
