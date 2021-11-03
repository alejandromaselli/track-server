const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const Track = require('../models/Track');

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const tracks = await Track.find({userId: req.user._id});
  return res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const {name, locations} = req.body;
  console.log(req.body);
  if (!name || !locations) return res.send(422).send({error: 'You must provide a name and locations'});
  try {
    const track = new Track({userId: req.user._id, name, locations})
    await track.save();
    return res.send(track);
  } catch (e) {
    res.status(422).send({error: e.message});
  }
});

module.exports = router;