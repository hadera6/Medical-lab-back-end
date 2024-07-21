// Load input validation
const item_reqValidator = require("../validation/item_reqValidator");
// Load Item_req form model
const Item_req = require("../models/Item_req");

const item_reqController = {

  StoreItem_req: (req, res) => {

    const { item, amount, user } = req.body

    // Form validation
    const { errors, isValid } = item_reqValidator.StoreInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    const newItem_req = new Item_req({ item, amount, user });

    newItem_req.save().then(
      item_req => { return res.json({ status: "success", data: { item_req } }); }
    ).catch(err => res.status(400).json(err));

  },
  AllItem_req: (req, res) => {

    Item_req.find({ state: 1 }).then(
      item_reqs => res.json({ status: "success", data: { item_reqs } })
    ).catch(err => res.status(400).json(err));

  },
  DeleteItem_req: (req, res) => {

    Item_req.findOne({ _id: req.params.id }).then(
      item_req => {
        if (item_req.state) {
          item_req.state = 0;
          item_req.deleted_at = Date.now();
          item_req.save();
          res.json({ status: "success", massage: "Item request deleted successfully" })
        }
        else
          res.status(400).json({ status: "fail", err, massage: "Item request not found" })
      }
    ).catch(err => res.status(400).json({ status: "fail", err, massage: "Item request not found" }));
  },
  AcceptItem_req: (req, res) => {

    Item_req.findOne({ _id: req.params.id, state: 1 }).then(
      item_req => {
        if (item_req.state) {
          item_req.accepted = 1;
          item_req.save();
          res.json({ status: "success", massage: "Item request accepted" })
        }
        else
          res.status(400).json({ status: "fail", err, massage: "Item request not found" })
      }
    ).catch(err => res.status(400).json({ status: "fail", err, massage: "Item request not found" }));
  },
  RejectItem_req: (req, res) => {

    Item_req.findOne({ _id: req.params.id, state: 1 }).then(
      item_req => {
        if (item_req.state) {
          item_req.accepted = 0;
          item_req.save();
          res.json({ status: "success", massage: "Item request rejected" })
        }
        else
          res.status(400).json({ status: "fail", err, massage: "Item request not found" })
      }
    ).catch(err => res.status(400).json({ status: "fail", err, massage: "Item request not found" }));
  }
}
module.exports = item_reqController