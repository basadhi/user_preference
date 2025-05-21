import {
    populateUserFormFields,
    saveProfileData,
    saveUserDetailsToStorage,
  } from "../../utils/dataService.js";
  
  
  export const AccSettings = {
    id: "acc_settings",
    responsive: true,
    type: "clean",
    rows: [
      // Header Row
      {
        height: 60,
        cols: [
          {
            template: "<h2 class='section_header'>Account Settings</h2>",
            css: "header_section",
          },
        ],
      },
  
      // Main Content
      {
        cols: [
          // Main Content Container
          {
            view: "scrollview",
            id: "settings_content",
            scroll: "y",
            body: {
              id: "settings_forms_container",
              type: "clean",
              rows: [
                // Profile Section
                {
                  id: "profileSection",
                  view: "form",
                  padding: 20,
                  elements: [
                    {
                      view: "template",
                      template:
                        "<h3 class='section_subheader'>Profile Information</h3>",
                      height: 40,
                      css: "subheader",
                    },
                    {
                      responsive: "profile_layout",
                      cols: [
                        // Profile Picture Column
                        {
                          id: "profile_pic_col",
                          gravity: 0.3,
                          minWidth: 200,
                          maxWidth: 300,
                          rows: [
                            {
                              id: "profile_image_container",
                              template: function () {
                                let savedImage =
                                  localStorage.getItem("profile_image");
                                let imageUrl = savedImage
                                  ? savedImage
                                  : "https://dummyimage.com/150"; // Load saved image or default one
                                return `<div style="text-align:center;">
                               <img id="profile-img" src="${imageUrl}" 
                                style="width:120px; height:120px; border-radius:50%; border:2px solid #ccc; object-fit:cover;">
                                 </div>`;
                              },
                              height: 140,
                            },
                            {
                              cols: [
                                {
                                  view: "uploader",
                                  id: "profile_uploader",
                                  value: "Upload Photo",
                                  accept: "image/*",
                                  multiple: false,
                                  autosend: false,
                                  css: "webix_primary",
                                  on: {
                                    onBeforeFileAdd: function (file) {
                                      const allowedTypes = [
                                        "image/png",
                                        "image/jpeg",
                                        "image/jpg",
                                        "image/gif",
                                      ];
  
                                      if (
                                        !allowedTypes.includes(file.file.type)
                                      ) {
                                        webix.message({
                                          type: "error",
                                          text: "Only image files (PNG, JPEG, JPG, GIF) are allowed!",
                                        });
                                        return false;
                                      }
                                      const reader = new FileReader();
                                      reader.onload = function (e) {
                                        const imageData = e.target.result;
                                        const img =
                                          document.getElementById("profile-img");
                                        if (img) {
                                          img.src = imageData;
                                          $$("profile_image_container").refresh();
  
                                          // Store image data in localStorage
                                          localStorage.setItem(
                                            "profile_image",
                                            imageData
                                          );
                                        }
                                      };
                                      reader.readAsDataURL(file.file);
                                      return false;
                                    },
                                  },
                                },
                              ],
                            },
                            {
                              cols: [
                                {
                                  view: "button",
                                  value: "Remove",
                                  css: "webix_danger",
                                  click: function () {
                                    const img =
                                      document.getElementById("profile-img");
                                    if (img) {
                                      img.src = "https://dummyimage.com/150";
                                      $$("profile_image_container").refresh();
                                      localStorage.removeItem("profile_image");
                                    }
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        // Profile Form Column
                        {
                          gravity: 0.7,
                          rows: [
                            {
                              template: "<div class='form_label'>Full Name</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "text",
                              name: "full_name",
                              placeholder: "Enter your name",
                              required: true,
                              height: 40,
                              bottomPadding: 15,
                              value: "",
                            },
  
                            {
                              template: "<div class='form_label'>Email</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "text",
                              name: "email",
                              disabled: true,
                              height: 40,
                              bottomPadding: 15,
                            },
  
                            {
                              template:
                                "<div class='form_label'>Phone Number</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "text",
                              name: "phone",
                              placeholder: "Enter your phone number",
                              required: true,
                              height: 40,
                              bottomPadding: 15,
                            },
                          ],
                        },
                      ],
                      on: {
                        onViewShow: function () {
                          populateUserFormFields();
                        },
                      },
                    },
                    {
                      padding: { top: 10 },
                      cols: [
                        {},
                        {
                          view: "button",
                          value: "Save Profile",
                          css: "webix_primary",
                          width: 150,
                          click: function () {
                            if (!$$("profileSection").validate()) {
                              webix.message({
                                type: "error",
                                text: "Please fill in all required fields.",
                              });
                              return;
                            }
  
                            // Save profile data
                            const profileData = $$("profileSection").getValues();
                            saveProfileData(profileData);
  
                            // Save to session storage
                            sessionStorage.setItem(
                              "userProfile",
                              JSON.stringify(profileData)
                            );
                            webix.message("Profile updated!");
                          },
                        },
                      ],
                    },
                  ],
                  rules: {
                    full_name: webix.rules.isNotEmpty,
                    phone: function (value) {
                      return /^[0-9]{10}$/.test(value);
                    },
                  },
                },
  
                // Personal Details Section
                {
                  id: "personalSection",
                  view: "form",
                  css: "card_section",
                  padding: 20,
                  elements: [
                    {
                      view: "template",
                      template:
                        "<h3 class='section_subheader'>Personal Details</h3>",
                      height: 40,
                      css: "subheader",
                    },
                    {
                      responsive: "personal_details_layout",
                      cols: [
                        // Column 1
                        {
                          gravity: 1,
                          minWidth: 250,
                          rows: [
                            {
                              template: "<div class='form_label'>Address</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "textarea",
                              name: "address",
                              placeholder: "Enter your full address",
                              height: 80,
                              bottomPadding: 15,
                            },
                            {
                              template: "<div class='form_label'>Gender</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "radio",
                              name: "gender",
                              options: [
                                { id: "male", value: "Male" },
                                { id: "female", value: "Female" },
                                { id: "other", value: "Other" },
                              ],
                              height: 40,
                              bottomPadding: 15,
                            },
  
                            {
                              template:
                                "<div class='form_label'>Marital Status</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "richselect",
                              name: "marital_status",
                              placeholder: "Select your marital status",
                              options: [
                                { id: "single", value: "Single" },
                                { id: "married", value: "Married" },
                                { id: "divorced", value: "Divorced" },
                                { id: "widowed", value: "Widowed" },
                                { id: "other", value: "Other" },
                              ],
                              height: 40,
                              bottomPadding: 15,
                            },
                          ],
                        },
                        // Column 2
                        {
                          gravity: 1,
                          minWidth: 250,
                          rows: [
                            {
                              template:
                                "<div class='form_label'>Date of Birth</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "datepicker",
                              name: "date_of_birth",
                              format: "%d/%m/%Y",
                              height: 40,
                              bottomPadding: 15,
                            },
  
                            {
                              template:
                                "<div class='form_label'>Occupation</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "text",
                              name: "occupation",
                              placeholder: "Enter your occupation",
                              height: 40,
                              bottomPadding: 15,
                            },
                          ],
                        },
                      ],
                    },
                    // Save Personal Details Button
                    {
                      padding: { top: 10 },
                      cols: [
                        {},
                        {
                          view: "button",
                          value: "Save Personal Details",
                          css: "webix_primary",
                          width: 180,
                          click: function () {
                            let form = $$("personalSection");
                            if (!form.validate()) {
                              webix.message({
                                type: "error",
                                text: "Please check your personal details.",
                              });
                              return;
                            }
  
                            // Save personal details
                            saveProfileData("personal", form.getValues());
                            webix.message("Personal details saved successfully!");
                          },
                        },
                      ],
                    },
                  ],
                },
  
                // Password Section
                {
                  id: "passwordSection",
                  view: "form",
                  css: "card_section",
                  padding: 20,
                  elements: [
                    {
                      view: "template",
                      template:
                        "<h3 class='section_subheader'>Change Password</h3>",
                      height: 40,
                      css: "subheader",
                    },
                    {
                      responsive: "password_layout",
                      cols: [
                        // Column 2
                        {
                          gravity: 1,
                          minWidth: 250,
                          rows: [
                            {
                              template:
                                "<div class='form_label'>New Password</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "text",
                              type: "password",
                              name: "new_password",
                              required: true,
                              height: 40,
                              bottomPadding: 15,
                            },
                          ],
                        },
                        // Column 3
                        {
                          gravity: 1,
                          minWidth: 250,
                          rows: [
                            {
                              template:
                                "<div class='form_label'>Confirm Password</div>",
                              height: 30,
                              css: "label_above",
                            },
                            {
                              view: "text",
                              type: "password",
                              name: "confirm_password",
                              required: true,
                              height: 40,
                              bottomPadding: 15,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      padding: { top: 10 },
                      cols: [
                        {},
                        {
                          view: "button",
                          value: "Update Password",
                          css: "webix_primary",
                          width: 150,
                          click: function () {
                            let form = $$("passwordSection");
                            let values = form.getValues();
  
                            if (values.new_password !== values.confirm_password) {
                              webix.message({
                                type: "error",
                                text: "Passwords do not match!",
                              });
                              return;
                            }
                            // Validate the new password length
                            if (values.new_password.length < 6) {
                              webix.message({
                                type: "error",
                                text: "Password must be at least 6 characters long.",
                              });
                              return;
                            }
  
                            // Update the currentLoggedin user's password in session storage
                            const currentLoggedIn = JSON.parse(
                              sessionStorage.getItem("currentLoggedin")
                            );
                            if (currentLoggedIn) {
                              currentLoggedIn.password = values.new_password; // Update password
                              sessionStorage.setItem(
                                "currentLoggedin",
                                JSON.stringify(currentLoggedIn)
                              ); // Save updated user session
                            }
  
                            webix.message("Password updated successfully!");
                            form.clear();
                          },
                        },
                      ],
                    },
                  ],
                  rules: {
                    current_password: webix.rules.isNotEmpty,
                    new_password: function (value) {
                      return value.length >= 6;
                    },
                    confirm_password: webix.rules.isNotEmpty,
                  },
                },
                // Save All Changes Button
                {
                  padding: { top: 20, bottom: 20 },
                  cols: [
                    {},
                    {
                      view: "button",
                      value: "Save All Changes",
                      css: "webix_primary webix_large",
                      width: 200,
                      height: 50,
                      click: function () {
                        try {
                          // Collect data from all sections
                          const profileData = $$("profileSection").getValues();
                          const personalData = $$("personalSection").getValues();
                          const passwordData = $$("passwordSection").getValues();
  
                          // Combine data for validation and saving
                          const combinedData = {
                            ...profileData,
                            personal: personalData,
                            new_password: passwordData.new_password,
                          };
  
                          // Save user details
                          const saveResult =
                            saveUserDetailsToStorage(combinedData);
  
                          if (saveResult.success) {
                            webix.message({
                              type: "success",
                              text: saveResult.message,
                              expire: 3000,
                            });
                          } else {
                            webix.message({
                              type: "error",
                              text: saveResult.message,
                              expire: 3000,
                            });
                          }
                        } catch (error) {
                          webix.message({
                            type: "error",
                            text: error.message || "An unexpected error occurred",
                            expire: 3000,
                          });
                        }
                      },
                    },
                    {},
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  
    // Responsive and Keyboard Navigation Configuration
    on: {
      onViewShow: function () {
        // Responsive handling
        const handleResponsive = function () {
          const isMobile = window.innerWidth <= 768;
          const menuToggle = $$("mobile_menu_toggle");
  
          console.log("Window width:", window.innerWidth);
          console.log("Is mobile:", isMobile);
          console.log("Menu toggle exists:", !!menuToggle);
  
          if (menuToggle) {
            console.log("Setting visibility:", isMobile);
            isMobile ? menuToggle.show() : menuToggle.hide();
          } else {
            console.error("mobile_menu_toggle element not found");
          }
        };
  
        // Keyboard Navigation
        this.attachEvent("onKeyPress", function (key, e) {
          const activeSection = webix.UIManager.getFocus();
  
          switch (key) {
            case 9: // Tab key
              e.preventDefault();
              webix.UIManager.nextInput(activeSection);
              break;
            case 27: // Escape key
              if (activeSection && activeSection.clear) {
                activeSection.clear();
              }
              break;
            case 13: // Enter key
              if (activeSection && activeSection.validate) {
                if (activeSection.validate()) {
                  // Implement save logic for the current section
                  const sectionData = activeSection.getValues();
                  console.log(
                    `Saving ${activeSection.config.id} data:`,
                    sectionData
                  );
                }
              }
              break;
          }
        });
  
        // Call populateUserFormFields to fetch and populate user data from users.json
        populateUserFormFields();
      },
    },
  };
  
  // Global error handling
  window.addEventListener("error", (event) => {
    console.error("Uncaught error:", event.error);
  });
  
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
  });
      