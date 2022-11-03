import userModel from "../../DB/model/user.model.js";

export const auth = () => {
  return async (req, res, next) => {
    if (
      !req.session ||
      !req.session?.user?.id ||
      !req.session?.user?.isLoggedIn
    ) {
      req.flash("messageErr", "In-Valid session information");
      res.redirect("/auth/login");
      // res.render("login", { messageErr: "In-Valid session information" });
    } else {
      const user = await userModel
        .findById(req.session.user.id)
        .select("email");
      if (!user) {
        req.flash("messageErr", "Account Not register yet");
        res.redirect("/auth/login");
        // res.render("login", { messageErr: "Account Not register yet" });
      } else {
        next();
      }
    }
  };
};
