const express = require("express");
const passport = require("passport")
const router = express.Router();
const labfController = require("../Controller/labfController");

const Authorize = passport.authenticate("jwt", { session: false });

router.post("/admin/lab_form/store", labfController.StoreLab_form);
router.get("/admin/lab_form/:id", labfController.AllLab_form);
router.get("/admin/lab_form", labfController.EveryLab_form);
router.get("/admin/lab_form/detail/:id", labfController.OneLab_form);
router.put("/admin/lab_form/update/:id", labfController.UpdateLab_form);
router.put("/admin/lab_form/delete/:id", labfController.DeleteLab_form);

router.post("/admin/form_catagory/store", labfController.StoreForm_catagory);
router.get("/admin/form_catagory", labfController.AllForm_catagory);
router.get("/admin/form_catagory/:id", labfController.OneForm_catagory);

router.post("/admin/form_title/store/:id", labfController.StoreForm_title);
router.get("/admin/form_title/:id", labfController.AllForm_title);
router.get("/admin/form_title/detail/:id", labfController.OneForm_title);
router.get("/admin/form_title", labfController.EveryForm_title);




module.exports = router;