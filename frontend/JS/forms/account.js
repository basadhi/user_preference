// import '../../styles/account.css';
export const AccountForm = {
    id: "account_settings_cell",
    //css: "account-settings",
    responsive: true, // Enable responsive behavior
    minWidth: 320,
    cols: [
      {
        view: "sidebar",
        id: "account_sidebar",
        //css: "account-sidebar",
        width: 200, // Set default width
        minWidth: 150, // Minimum width
        gravity: 0.2,
        data: [
          { id: "profile", value: "Profile", icon: "wxi-user" },
          { id: "personal", value: "Personal", icon: "wxi-info" },
          { id: "password", value: "Password", icon: "wxi-lock" }
        ],
        on: {
          onAfterSelect: function (id) {
            $$("account_multiview1").setValue(id);
          }
        }
      },
      {
        view: "multiview",
        id: "account_multiview1",
        animate: false,
        //css: "account-content",
        gravity: 0.8,
        cells: [
          {
            id: "profile",
            scroll: "y",
            rows: [
              {
                template: "<h2>Profile Settings</h2>",
                type: "header",
                height: 50,
                //css: "form-header"
              },
              {
                view: "form",
                id: "profile_form",
                //css: "modern-form",
                scroll: "auto", // Enable scrolling if content is too big
                elementsConfig: { 
                labelWidth: 120, // Consistent label width for all form elements
                adjustWidth: true // Adjust width based on parent container
              },
                elements: [
                  {
                    cols: [
                      {
                        view: "template",
                        id: "profile_image_template",
                        template: function () {
                          const savedImage = localStorage.getItem("profile_image") || "https://dummyimage.com/150";
                          return `<div class="profile-image-container">
                            <img id='profile-img' src='${savedImage}' class="profile-image">
                            <div class="profile-image-overlay">
                              <i class="wxi-camera"></i>
                            </div>
                          </div>`;
                        },
                        // width: 160,
                        // height: 160
                      },
                      {
                        rows: [
                          {
                            view: "uploader",
                            value: "Change Photo",
                            accept: "image/*",
                            multiple: false,
                            //css: "modern-uploader",
                            on: {
                              onBeforeFileAdd: function (file) {
                                const allowed = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
                                if (!allowed.includes(file.file.type)) {
                                  webix.message({ type: "error", text: "Unsupported file type" });
                                  return false;
                                }
                                const reader = new FileReader();
                                reader.onload = function (e) {
                                  document.getElementById("profile-img").src = e.target.result;
                                  localStorage.setItem("profile_image", e.target.result);
                                  $$("profile_image_template").refresh();
                                };
                                reader.readAsDataURL(file.file);
                                return false;
                              }
                            }
                          }
                        ]
                      }
                    ]
                  },
                  { view: "text", label: "Full Name", name: "full_name", css: "form-field" },
                  { view: "text", label: "Email", name: "email", disabled: true, css: "form-field" },
                  { view: "text", label: "Phone", name: "phone", css: "form-field" },
                  { view: "button", value: "Save Changes", css: "webix_primary save-button", click: function () {
                    const form = $$("profile_form");
                    if (!form.validate()) {
                      webix.message({ type: "error", text: "Please complete all fields correctly" });
                      return;
                    }
                    sessionStorage.setItem("userProfile", JSON.stringify(form.getValues()));
                    webix.message({ type: "success", text: "Profile saved successfully" });
                  } }
                ],
                rules: {
                  full_name: webix.rules.isNotEmpty,
                  phone: function (v) { return /^[0-9]{10}$/.test(v); }
                }
              },
              {
                template: "<h2>Personal Information</h2>",
                type: "header",
                //css: "form-header"
              },
              {
                view: "form",
                id: "personal_form",
                //css: "modern-form",
                elements: [
                  { view: "textarea", label: "Address", name: "address", css: "form-field" },
                  { view: "radio", label: "Gender", name: "gender", css: "form-field", options: [
                    { id: "male", value: "Male" },
                    { id: "female", value: "Female" },
                    { id: "other", value: "Other" }
                  ] },
                  { view: "richselect", label: "Marital Status", name: "marital_status", css: "form-field", options: [
                    "Single", "Married", "Divorced", "Widowed", "Other"
                  ] },
                  { view: "datepicker", label: "Date of Birth", name: "date_of_birth", format: "%d/%m/%Y", css: "form-field" },
                  { view: "text", label: "Occupation", name: "occupation", css: "form-field" },
                  { view: "button", value: "Save Changes", css: "webix_primary save-button", click: function () {
                    if (!$$("personal_form").validate()) {
                      webix.message({ type: "error", text: "Please complete the form" });
                      return;
                    }
                    webix.message({ type: "success", text: "Personal details saved successfully" });
                  } }
                ]
              }
            ]
          },
          {
            id: "personal",
            rows: [
              {
                template: "<h2>Personal Information</h2>",
                type: "header",
                //css: "form-header"
              },
              {
                view: "form",
                id: "personal_form2",
                //css: "modern-form",
                elements: [
                  { view: "textarea", label: "Address", name: "address", css: "form-field" },
                  { view: "radio", label: "Gender", name: "gender", css: "form-field", options: [
                    { id: "male", value: "Male" },
                    { id: "female", value: "Female" },
                    { id: "other", value: "Other" }
                  ] },
                  { view: "richselect", label: "Marital Status", name: "marital_status", css: "form-field", options: [
                    "Single", "Married", "Divorced", "Widowed", "Other"
                  ] },
                  { view: "datepicker", label: "Date of Birth", name: "date_of_birth", format: "%d/%m/%Y", css: "form-field" },
                  { view: "text", label: "Occupation", name: "occupation", css: "form-field" },
                  { view: "button", value: "Save Changes", css: "webix_primary save-button", click: function () {
                    if (!$$("personal_form2").validate()) {
                      webix.message({ type: "error", text: "Please complete the form" });
                      return;
                    }
                    webix.message({ type: "success", text: "Personal details saved successfully" });
                  } }
                ]
              }
            ]
          },
          {
            id: "password",
            rows: [
              {
                template: "<h2>Password Update</h2>",
                type: "header",
                //css: "form-header"
              },
              {
                view: "form",
                id: "password_form",
                //css: "modern-form",
                elements: [
                  { view: "text", type: "password", label: "New Password", name: "new_password", css: "form-field" },
                  { view: "text", type: "password", label: "Confirm Password", name: "confirm_password", css: "form-field" },
                  { view: "button", value: "Update Password", css: "webix_primary save-button", click: function () {
                    const values = $$("password_form").getValues();
                    if (values.new_password !== values.confirm_password) {
                      webix.message({ type: "error", text: "Passwords do not match" });
                      return;
                    }
                    if (values.new_password.length < 6) {
                      webix.message({ type: "error", text: "Password must be at least 6 characters" });
                      return;
                    }
                    webix.message({ type: "success", text: "Password updated successfully" });
                  } }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  