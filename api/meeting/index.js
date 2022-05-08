var express = require('express');
var router = express.Router();
var passport = require('passport');
const UserModel = require('../../db/model.js').UserModel;
const MeetingModel = require('../../db/model.js').MeetingModel;

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  MeetingModel.find(req.user._id).populate({ path: '_id_user', select: 'name teamName' }).exec(function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error', err: err }) };

    res.status(200).send(data)

  })

});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

  const updatedMeeting = new MeetingModel(req.body);
  const meeting = await updatedMeeting.save();

  UserModel.updateMany({ _id: req.body._id_user }, { $push: { _id_meeting: meeting._id } }, function (err, data) {
    if (err) { return res.status(500).json({ message: 'Internal error', err: err }) };

    res.status(204).send();

  });

});

module.exports = router;