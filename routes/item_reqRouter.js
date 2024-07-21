const express = require("express");
const passport = require("passport")
const router = express.Router();
const item_reqController = require("../Controller/item_reqController");

const Authorize = passport.authenticate("jwt", { session: false });

router.post("/item_req/store", item_reqController.StoreItem_req);
router.get("/admin/item_req", item_reqController.AllItem_req);
router.put("/admin/item_req/delete/:id", item_reqController.DeleteItem_req);
router.put("/admin/item_req/accept/:id", item_reqController.AcceptItem_req);
router.put("/admin/item_req/reject/:id", item_reqController.RejectItem_req);

module.exports = router;