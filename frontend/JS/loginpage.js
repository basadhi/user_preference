// import { authenticateUser } from "../utils/dataService.js";
//import { isMobile } from "../utils/isMobile.js";

export const LoginPage = {
  id: "login",
  type: "space",
  rows:[ {gravity:1},
  {
  cols: [
    {
      gravity: 1,
    },
    {
      view: "form",
      id: "login_form",
      borderless: true,
      width: Math.min(window.innerWidth * 0.8, 400),
      // maxWidth: 400, // Limit form width to 400px
      // responsiveCell: false, // Prevent form from being hidden or moved
      elements: [
        {
          view: "toolbar",
          height: 50,
          borderless: true,
          elements: [
            {
              view: "icon",
              icon: "wxi-angle-left",
              click: function () {
                showView("home");
              },
            },
            {
              view: "label",
              label: "Log in / Sign in",
              align: "center",
            },
          ],
        },
        {
          view: "text",
          name: "email",
          placeholder: "Email",
          required: true,
          validate: webix.rules.isEmail,
          invalidMessage: "Please enter a valid email address",
        },
        {
          view: "text",
          type: "password",
          name: "password",
          placeholder: "Password",
          required: true,
          invalidMessage: "Password cannot be empty",
        },
        {
          view: "template",
          template: "<a href='#' class='forgot-password'>Forgot Password?</a>",
          height: 40,
          borderless: true,
          onClick: {
            "forgot-password": function () {
              showView("forgotpassword");
            },
          },
        },
        {
          view: "button",
          value: "Log in",
          height: 50,
          click: async function () {
            const form = $$("login_form");

            if (!form.validate()) {
              webix.message({
                type: "error",
                text: "Please enter valid details.",
              });
              return;
            }

            const values = form.getValues();
            try {
              const user = await authenticateUser(
                values.email,
                values.password,
              );
              console.log("formemail:", user);

              if (user === null) {
                webix.modalbox({
                  title: "Not Registered",
                  text: "You are not registered. Redirecting to Sign Up page...",
                  buttons: ["OK"],
                  callback: function (result) {
                      // Once the modal box is dismissed, navigate to the signup page
                      window.showView("signup");
                  }
              });
                
              } else if (user === "invalid_password") {
                // Incorrect password
                webix.message({
                  type: "error",
                  text: "Invalid email/password.",
                });
              } else {
                // Successful login
                webix.message({ type: "success", text: "Login successful!" });
                sessionStorage.setItem("currentLoggedin", JSON.stringify({ email: user.email, password: user.password }));
                localStorage.setItem("loggedUser", JSON.stringify(user));

                showView("home");
                location.reload();
              }
            } catch (error) {
              console.error("Login Error:", error);
              webix.message({
                type: "error",
                text: "Login failed. Try again later.",
              });
            }
          },
        },
        { height: 15 },
        {
          view: "template",
          template:
            "<div class='signup-text'>Create an Account. <a href='#' class='signup-link'>Sign up</a></div>",
          height: 40,
          borderless: true,
          onClick: {
            "signup-link": function () {
              showView("signup");
            },
          },
        },
        {gravity: 1},
      ],
    },
    {
      gravity: 1,
    },
  ],
},
{
  gravity:1
}
],
};
