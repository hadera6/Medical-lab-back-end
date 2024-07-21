// Load input validation
const faqValidator = require("../validation/faqValidator");
// Load Faq form model
const Faq = require("../models/Faq");

const faqController = {

  StoreFaq: (req, res) => {

    const { content, user } = req.body

    // Form validation
    const { errors, isValid } = faqValidator.StoreInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    const newFaq = new Faq({ content, user });

    newFaq.save().then(
      faq => { return res.json({ status: "success", data: { faq } }); }
    ).catch(err => res.status(400).json(err));

  },
  AllFaq: (req, res) => {

    Faq.find({ state: 1 }).then(
      faqs => res.json({ status: "success", data: { faqs } })
    ).catch(err => res.status(400).json(err));

  },
  DeleteFaq: (req, res) => {

    Faq.findOne({ _id: req.params.id }).then(
      faq => {
        if (faq.state) {
          faq.state = 0;
          faq.deleted_at = Date.now();
          faq.save();
          res.json({ status: "success", massage: "Faq deleted successfully" })
        }
        else
          res.json({ status: "fail", err, massage: "Faq not found" })
      }
    ).catch(err => res.json({ status: "fail", err, massage: "Faq not found" }));
  }
}
module.exports = faqController