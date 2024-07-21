// Load input validation
const labfValidator = require("../validation/labfValidator");
// Load lab form model
const Lab_form = require("../models/Lab_form");
const Form_title = require("../models/Form_title");
const Form_catagory = require("../models/Form_catagory");

const labfController = {

  StoreLab_form: (req, res) => {

    const { title, catagory, range, unit, price, type,
      duration, test, title_id, catagory_id } = req.body

    // Form validation
    const { errors, isValid } = labfValidator.StoreInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    const newLabf = new Lab_form({
      title, catagory, range, unit, price,
      type, duration, test, title_id, catagory_id
    });

    newLabf.save().then(
      lab_form => res.json({ status: "success", data: { lab_form } })
    ).catch(err => res.status(400).json(err));

  },
  AllLab_form: (req, res) => {

    Lab_form.find({ title_id: req.params.id, state: 1 }).then(
      lab_forms => res.json({ status: "success", data: { lab_forms } })
    ).catch(err => res.status(400).json(err));

  },
  EveryLab_form: (req, res) => {

    Lab_form.find({ state: 1 }).then(
      all_lab_forms => res.json({ status: "success", data: { all_lab_forms } })
    ).catch(err => res.status(400).json(err));

  },
  OneLab_form: (req, res) => {

    Lab_form.findOne({ _id: req.params.id, state: 1 }).then(
      lab_form => {
        if (lab_form && lab_form.state)
          res.json({ status: "success", data: { lab_form } })
        else
          res.status(400).json({ status: "fail", massage: "Lab form not found" });
      }
    ).catch(err => res.status(400).json(err));
  },
  UpdateLab_form: (req, res) => {

    const { range, unit, price, type,
      duration, test } = req.body
    // Form validation
    const { errors, isValid } = labfValidator.StoreInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    Lab_form.findOne({ _id: req.params.id, state: 1 }).then(
      lab_form => {
        if (lab_form.state) {

          lab_form.range = range;
          lab_form.unit = unit;
          lab_form.price = price;
          lab_form.type = type;
          lab_form.duration = duration;
          lab_form.test = test;
          lab_form.save();
          res.json({ status: "success", data: { lab_form } })
        }
        else
          res.status(400).json({ status: "fail", massage: "Lab form not found" });
      }
    ).catch(err => res.status(400).json({ status: "fail", massage: "Lab form not found" }));
  },
  DeleteLab_form: (req, res) => {

    Lab_form.findOne({ _id: req.params.id }).then(
      lab_form => {
        if (lab_form) {
          lab_form.state = 0;
          lab_form.deleted_at = Date.now();
          lab_form.save();
          res.json({ status: "success", massage: "Lab form deleted successfully" })
        }
        else
          res.status(400).json({ status: "fail", massage: "Lab form not found" });
      }
    ).catch(err => res.status(400).json({ status: "fail", massage: "Lab form not found" }));
  },
  StoreForm_catagory: (req, res) => {

    const { catagory } = req.body

    // Form validation
    const { errors, isValid } = labfValidator.StoreForm_catagoryInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    const newForm_catagory = new Form_catagory({ catagory });

    newForm_catagory.save().then(
      catagory => res.json({ status: "success", data: { catagory } })
    ).catch(err => res.status(400).json(err));

  },
  StoreForm_title: (req, res) => {

    const { title, catagory } = req.body;
    const catagory_id = req.params.id;

    // Form validation
    const { errors, isValid } = labfValidator.StoreForm_titleInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    const newForm_title = new Form_title({ title, catagory, catagory_id });

    newForm_title.save().then(
      title => res.json({ status: "success", data: { title } })
    ).catch(err => res.status(400).json(err));
  },
  AllForm_title: (req, res) => {

    Form_title.find({
      catagory_id: req.params.id, state: 1
    }).then(
      titles => res.json({ status: "success", data: { titles } })
    ).catch(err => res.status(400).json(err));

  },
  EveryForm_title: (req, res) => {

    Form_title.find({ state: 1 }).then(
      all_titles => res.json({ status: "success", data: { all_titles } })
    ).catch(err => res.status(400).json(err));

  },
  AllForm_catagory: (req, res) => {

    Form_catagory.find({ state: 1 }).then(
      catagorys => res.json({ status: "success", data: { catagorys } })
    ).catch(err => res.status(400).json(err));

  },
  OneForm_title: (req, res) => {

    Form_title.findOne({ _id: req.params.id, state: 1 }).then(
      title => {
        if (title && title.state)
          res.json({ status: "success", data: { title } })
        else
          res.status(400).json({ status: "fail", massage: "Title not found" })
      }
    ).catch(err => res.status(400).json(err));
  },
  OneForm_catagory: (req, res) => {

    Form_catagory.findOne({ _id: req.params.id, state: 1 }).then(
      catagory => {
        if (catagory && catagory.state)
          res.json({ status: "success", data: { catagory } })
        else
          res.status(400).json({ status: "fail", massage: "Catagory not found" })
      }
    ).catch(err => res.status(400).json(err));
  },
}
module.exports = labfController