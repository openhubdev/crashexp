const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

const idFilter = req => member => member.id === parseInt(req.params.id);

// Get All Members
router.get('/', (req, res) => res.json(members)); // this should match the json; take out 'api/members/' as it's defined on index.js

// Get Single Member
router.use('/:id', (req, res) => {
  //res.send(req.params.id);
  const found = members.some(idFilter(req));
  if (found) {
    //res.json(members.filter(member => member.id === parseInt(req.params.id))); // if you just enter 'req.params.id' = string
    res.json(members.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member w that id` });
  }

});

// Create a Member
router.post('/', (req, res) => {
  //res.send(req.body);
  const newMember = {

    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
    /*
    ...req.body,
    id: uuid.v4(),
    status: 'active'
    */
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: `cmon please include name and email` }); // add "retunr" > no need for "else"
  }
  members.push(newMember);
  //res.json(members); // show the JASON list of members
  res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {

  /*
  const found = members.some(member => member.id === parseInt(req.params.id)); //match found

  if (found) {
    const updMember = req.body;
    //console.log(`Member found -- ${req.params.id}`);
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Member updated', member });
      }
    }); // end foreach

  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  */
  const found = members.some(idFilter(req));

  if (found) {
    members.forEach((member, i) => {
      if (idFilter(req)(member)) {

        const updMember = { ...member, ...req.body };
        members[i] = updMember
        res.json({ msg: 'Member updated', updMember });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }

});

// Delete Member
router.delete('/:id', (req, res) => {
  /*
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member DELETED",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member w that id of ${req.params.id}` });
  }
  */
  const found = members.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => !idFilter(req)(member))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }

});

module.exports = router;