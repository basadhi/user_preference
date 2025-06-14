import { authenticateUser } from "./utils/dataService.js";
import { initializePreferences } from "../js/forms/theme.js";


if (!window.showView) {
    window.showView = function(viewId) {
        $$("main_content").setValue(viewId);
    };
}

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
      id: "login_page_form",
      borderless: true,
      width: Math.min(window.innerWidth * 0.8, 400),
      elements: [
        {
          view: "toolbar",
          height: 50,
          borderless: true,
          elements: [
            {
                view: "button",
                type: "icon",
                icon: "mdi mdi-arrow-left",
                width: 40,
                css: "transparent-button",
                click: function() {
                  showView("home_ui");
                }
              },
            {
              view: "label",
              label: "Log in / Sign in",
              align: "center",
            },
            {
                view: "button",
                type: "icon",
                icon: "mdi mdi-home",    
                tooltip: "Go to Home Page",
                width: 40,               
                click: function () {
                  try {
                    showView("home_ui");
                  } catch (error) {
                    console.error("Navigation error:", error);
                    
                  }
                },
              }
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
              // showView("forgotpassword");
            },
          },
        },
        {
          view: "button",
          value: "Log in",
          height: 50,
          click: async function () {
            const form = $$("login_page_form");

            if (!form.validate()) {
              webix.message({
                type: "error",
                text: "Please enter valid details.",
              });
              return;
            }

            const values = form.getValues();
            // Show loading indicator
            webix.message({type:"info", text:"Logging in...", expire: 1000});
            
            try {
              const {user, preferences} = await authenticateUser(
                values.email,
                values.password,
              );
              console.log("User data:", user);

              if (user === null) {
                webix.modalbox({
                  title: "Not Registered",
                  text: "You are not registered. Redirecting to Sign Up page...",
                  buttons: ["OK"],
                  callback: function (result) {
                      showView("signup");
                  }
                });
              } else if (user === "invalid_password") {
                webix.message({
                  type: "error",
                  text: "Invalid email or password.",
                  expire: 3000
                });
              } else {
                // Successful login
                webix.message({ 
                  type: "success", 
                  text: "Login successful!",
                  expire: 2000
                });
                
                // Store user data for session
                sessionStorage.setItem("currentLoggedin", JSON.stringify({ email: user.email }));
                localStorage.setItem("loggedUser", JSON.stringify(user));
                initializePreferences();
                // localStorage.setItem("preferences", JSON.stringify(user.preferences));
                
                // Navigate to home page after a short delay
                setTimeout(() => {
                  showView("home_ui");
                  location.reload();
                }, 1000);
              }
            } catch (error) {
              console.error("Login Error:", error);
              let errorMessage = "Login failed. Please try again.";
              
              if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                  errorMessage = error.response.data;
                } else if (error.response.data.message) {
                  errorMessage = error.response.data.message;
                } else if (error.response.data.non_field_errors) {
                  errorMessage = error.response.data.non_field_errors[0];
                }
              }
              
              webix.message({
                type: "error",
                text: error.response?.data?.message || "Login failed. Try again later.",
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