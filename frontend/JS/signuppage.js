//import { updateProfile } from "../utils/updateprofile.js";
import { addUser, checkUserExists } from "../utils/dataService.js";

export const SignupPage = {
  id: "signup",
  rows: [
    { gravity: 1 },
    {
      cols: [
        { gravity: 1 },
        {
          view: "form",
          id: "signup_form",
          borderless: true,
          width: Math.min(window.innerWidth * 0.8, 400),
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
                  }
                },
                {
                  view: "label",
                  label: "Sign Up",
                  align: "center"
                },
              ]
            },
            {
              view: "text",
              name: "first_name",
              css: "dark-input",
              placeholder: "First Name",
              required: true
            },
            {
              view: "text",
              name: "last_name",
              css: "dark-input",
              placeholder: "Last Name",
              required: true
            },
            {
              view: "text",
              name: "email",
              css: "dark-input",
              placeholder: "Email",
              required: true,
              validate: webix.rules.isEmail
            },
            {
              view: "text",
              type: "password",
              name: "password",
              id: "password_input",
              placeholder: "Password",
              required: true,
              validate: function (value) {
                return value.length >= 6;
              },
              on: {
                onTimedKeyPress: function () {
                  const value = this.getValue();
                  if (value.length < 6) {
                    $$("password_error").setHTML("<span style='color: red;'>Input at least 6 character password</span>");
                  } else {
                    $$("password_error").setHTML("");
                  }
                }
              }
            },
            {
              view: "template",
              id: "password_error",
              borderless: true,
              height: 20,
              template: ""
            },
            {
              view: "button",
              value: "Sign Up",
              height: 50,
              click: async function () {
                if ($$("signup_form").validate()) {
                  const values = $$("signup_form").getValues();
                  const newUser = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password 
                  };

                  try {
                    if (await checkUserExists(newUser.email)) {
                      webix.message({ type: "error", text: "User already exists" });
                      return;
                    }

                    //const addedUser = await addUser(newUser);
                    // localStorage.setItem("userProfile", JSON.stringify(addedUser));
                    // updateProfile(addedUser);
                    const user = {
                      email: newUser.email,
                      password: newUser.password
                    };

                    sessionStorage.setItem("currentLoggedin", JSON.stringify({ email: user.email, password: user.password }));
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    webix.message("Account created successfully");
                    showView("login"); 
                  } catch (error) {
                    console.error("Error registering user:", error);
                    webix.message({ type: "error", text: error.message });
                  }
                } else {
                  webix.message({ type: "error", text: "Please enter valid details" });
                }
              }
            },
            { height: 15 },
            {
              view: "template",
              template: "<div class='login-text'>Already have an account? <a href='#' class='login-link'>Log in</a></div>",
              height: 40,
              borderless: true,
              onClick: {
                "login-link": function () {
                  showView("login");
                }
              }
            }
          ],
          rules: {
            "first_name": webix.rules.isNotEmpty,
            "last_name": webix.rules.isNotEmpty,
            "email": webix.rules.isEmail,
            "password": function (value) { return value.length >= 6; }
          }
        },
        { gravity: 1 }
      ]
    },
    { gravity: 1 }
  ]
};
