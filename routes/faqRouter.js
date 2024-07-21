const express = require("express");
const passport = require("passport")
const router = express.Router();
const faqController = require("../Controller/faqController");

const Authorize = passport.authenticate("jwt", {session: false});

router.post("/faq/store", faqController.StoreFaq);
router.get("/admin/faq", faqController.AllFaq);
router.put("/admin/faq/delete/:id", faqController.DeleteFaq);

module.exports = router;