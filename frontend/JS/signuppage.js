import { apiService } from "./utils/apiService.js";

// Add showView function to window scope
window.showView = function(viewId) {
    $$("main_content").setValue(viewId);
};

export const SignupPage = {
  id: "signup",
  scroll: "y",
  rows: [
    {
      view: "toolbar",
      padding: 10,
      height: 60,
      css: "app-header",
      cols: [
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
          label: "Create Account", 
          css: "header-title",
          width: 200
        },
        {
          view: "button",
          type: "icon",
          icon: "mdi mdi-home",
          tooltip: "Go to Home Page",
          width: 40,
          css: "transparent-button",
          click: function() {
            try {
              showView("home_ui");
            } catch (error) {
              console.error("Navigation error:", error);
              window.location.href = "./index.html";
            }
          }
        }
      ]
    },
    {
      type: "clean",
      paddingX: 15,
      paddingY: 20,
      rows: [
        
        { height: 20 },
        {
          cols: [
            { gravity: 1 },
            {
              view: "form",
              id: "signup_form",
              borderless: true,
              width: 400,
              minWidth: 320,
              gravity: 0,
              elementsConfig: {
                labelPosition: "top",
                bottomPadding: 18
              },
              elements: [
                {
                  view: "text",
                  name: "first_name",
                  label: "First Name",
                  placeholder: "Enter your first name",
                  required: true,
                  css: "signup-input"
                },
                {
                  view: "text",
                  name: "last_name",
                  label: "Last Name",
                  placeholder: "Enter your last name",
                  required: true,
                  css: "signup-input"
                },
                {
                  view: "text",
                  name: "email",
                  label: "Email Address",
                  placeholder: "your.email@example.com",
                  required: true,
                  validate: webix.rules.isEmail,
                  invalidMessage: "Please enter a valid email address",
                  css: "signup-input"
                },
                {
                  view: "text",
                  type: "password",
                  name: "password",
                  id: "password_input",
                  label: "Password",
                  placeholder: "Create a secure password",
                  required: true,
                  css: "signup-input",
                  validate: function(value) {
                    return value.length >= 8;
                  },
                  invalidMessage: "Password must be at least 8 characters",
                  on: {
                    onTimedKeyPress: function() {
                      const value = this.getValue();
                      const passwordStrength = $$("password_strength");
                      if (value.length < 8) {
                        passwordStrength.define("badge", "weak");
                        passwordStrength.setValue("Weak password");
                        passwordStrength.refresh();
                      } else if (value.length < 12) {
                        passwordStrength.define("badge", "medium");
                        passwordStrength.setValue("Medium password");
                        passwordStrength.refresh();
                      } else {
                        passwordStrength.define("badge", "strong");
                        passwordStrength.setValue("Strong password");
                        passwordStrength.refresh();
                      }
                    }
                  }
                },
                {
                  view: "template",
                  id: "password_strength",
                  height: 24,
                  borderless: true,
                  badge: "weak",
                  css: "password-strength",
                  template: function(obj) {
                    const colors = {
                      weak: "#FF5252",
                      medium: "#FFC107",
                      strong: "#4CAF50"
                    };
                    return `<div style="color: ${colors[obj.badge]}">${obj.value || ""}</div>`;
                  }
                },
                {
                  view: "text",
                  type: "password",
                  name: "confirm_password",
                  label: "Confirm Password",
                  placeholder: "Re-enter your password",
                  required: true,
                  css: "signup-input",
                  validate: function(value) {
                    return value === $$("password_input").getValue();
                  },
                  invalidMessage: "Passwords do not match"
                },
                {
                  margin: 10,
                  paddingY: 10,
                  cols: [
                    {
                      view: "checkbox",
                      id: "terms_checkbox",
                      labelRight: "I agree to the Terms of Service",
                      labelWidth: 0,
                      width: 250
                    }
                  ]
                },
                { height: 10 },
                {
                  view: "button",
                  value: "Create Account",
                  type: "form",
                  height: 50,
                  css: "signup-button",
                  click: function() {
                    const form = $$("signup_form");
                    
                    if (!$$("terms_checkbox").getValue()) {
                      webix.message({ 
                        type: "error", 
                        text: "Please agree to the Terms of Service" 
                      });
                      return;
                    }
                    
                    if (form.validate()) {
                      const values = form.getValues();
                      // Show loading state
                      this.disable();
                      this.setValue("Creating account...");
                      
                      // Call Django API
                      apiService.post("/api/auth/register/", {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        password: values.password
                      })
                      .then(response => {
                        webix.message({
                          type: "success",
                          text: "Account created successfully!",
                          expire: 3000
                        });
                        
                        // Store the authentication token if provided by your Django backend
                        if (response.token) {
                          localStorage.setItem("authToken", response.token);
                        }
                        
                        // Redirect to login page
                        setTimeout(() => showView("login"), 1000);
                      })
                      .catch(error => {
                        console.error("Registration error:", error);
                        let errorMessage = "Registration failed";
                        
                        // Handle specific error messages from Django backend
                        if (error.response && error.response.data) {
                          if (error.response.data.email) {
                            errorMessage = "Email already exists";
                          } else if (error.response.data.non_field_errors) {
                            errorMessage = error.response.data.non_field_errors[0];
                          } else if (typeof error.response.data === "string") {
                            errorMessage = error.response.data;
                          }
                        }
                        
                        webix.message({ type: "error", text: errorMessage });
                      })
                      .finally(() => {
                        // Reset button state
                        this.enable();
                        this.setValue("Create Account");
                      });
                    } else {
                      webix.message({ 
                        type: "error", 
                        text: "Please correct the highlighted fields" 
                      });
                    }
                  }
                },
                { height: 20 },
                {
                  view: "template",
                  borderless: true,
                  height: 40,
                  css: "login-redirect",
                  template: "<div class='login-text'>Already have an account? <a href='javascript:void(0)' class='login-link'>Log in</a></div>",
                  onClick: {
                    "login-link": function() {
                      showView("login");
                    }
                  }
                }
              ],
              rules: {
                "first_name": webix.rules.isNotEmpty,
                "last_name": webix.rules.isNotEmpty,
                "email": webix.rules.isEmail,
                "password": function(value) { return value.length >= 8; },
                "confirm_password": function(value) { 
                  return value === $$("password_input").getValue(); 
                }
              }
            },
            { gravity: 1 }
          ]
        },
        { gravity: 1 }
      ]
    }
  ]
};

// Create an API service utility if you don't have one already
// This should be in ../utils/apiService.js
/*
export const apiService = {
  baseUrl: "http://localhost:8000", // Change to your Django backend URL

  async request(endpoint, method = "GET", data = null) {
    const url = this.baseUrl + endpoint;
    const headers = {
      "Content-Type": "application/json"
    };
    
    // Add authorization header if token exists
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const options = {
      method,
      headers,
      credentials: "include" // Include cookies for sessions if needed
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    
    // Parse JSON response if available
    let responseData;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    
    // Handle API error responses
    if (!response.ok) {
      const error = new Error(responseData.message || "API request failed");
      error.response = { status: response.status, data: responseData };
      throw error;
    }
    
    return responseData;
  },
  
  get(endpoint) {
    return this.request(endpoint);
  },
  
  post(endpoint, data) {
    return this.request(endpoint, "POST", data);
  },
  
  put(endpoint, data) {
    return this.request(endpoint, "PUT", data);
  },
  
  delete(endpoint) {
    return this.request(endpoint, "DELETE");
  }
};
*/