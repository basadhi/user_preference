import { apiService } from '../utils/apiService.js';

const token = localStorage.getItem("authToken");

export const AccountForm = {

  id: "account_settings_cell",
  responsive: true,
  minWidth: 320,
  rows: [
    {
      // Header section
      template: "<div class='page-header'><h1>Account Settings</h1><p>Manage your account information and preferences</p></div>",
      type: "header",
      height: 80,
      css: "modern-header"
    },
    {
      // Main content area
      cols: [
        {
          // Sidebar navigation
          view: "sidebar",
          id: "account_sidebar",
          width: 280,
          minWidth: 200,
          maxWidth: 350,
          gravity: 0.3,
          css: "modern-sidebar",
          data: [
            { 
              id: "profile", 
              value: "Profile Information", 
              icon: "wxi-user",
              badge: "" 
            },
            { 
              id: "personal", 
              value: "Personal Details", 
              icon: "wxi-info",
              badge: "" 
            },
            { 
              id: "security", 
              value: "Security & Password", 
              icon: "wxi-lock",
              badge: "" 
            },
            
          ],
          on: {
            onAfterSelect: function (id) {
              $$("account_content_multiview").setValue(id);
            }
          }
        },
        {
          // Spacer
          width: 20
        },
        {
          // Content area
          view: "multiview",
          id: "account_content_multiview",
          animate: { type: "slide", direction: "left" },
          gravity: 0.7,
          minWidth: 400,
          css: "content-area",
          cells: [
            {
              // Profile tab
              id: "profile",
              rows: [
                {
                  template: "<div class='section-header'><h2>Profile Information</h2><p>Update your basic profile details</p></div>",
                  type: "header",
                  height: 60,
                  css: "section-title"
                },
                {
                  view: "scrollview",
                  scroll: "y",
                  body: {
                    rows: [
                      {
                        // Profile image section
                        cols: [
                          {
                            rows: [
                              {
                                view: "template",
                                id: "profile_image_container",
                                template: function () {
                                  const savedImage = localStorage.getItem("profile_image") || "/api/placeholder/120/120";
                                  return `
                                    <div class="profile-image-wrapper">
                                      <div class="profile-image-container">
                                        <img id='profile-img' src='${savedImage}' class="profile-image">
                                        <div class="profile-image-overlay">
                                          <i class="wxi-camera"></i>
                                          <span>Change</span>
                                        </div>
                                      </div>
                                    </div>
                                  `;
                                },
                                height: 140,
                                css: "profile-image-section"
                              },
                              {
                                view: "uploader",
                                value: "Upload New Photo",
                                accept: "image/*",
                                multiple: false,
                                height: 40,
                                css: "upload-button",
                                on: {
                                  onBeforeFileAdd: function (file) {
                                    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];
                                    if (!allowed.includes(file.file.type)) {
                                      webix.message({ type: "error", text: "Please upload a valid image file (PNG, JPG, GIF, WebP)" });
                                      return false;
                                    }
                                    if (file.file.size > 5 * 1024 * 1024) {
                                      webix.message({ type: "error", text: "File size must be less than 5MB" });
                                      return false;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                      document.getElementById("profile-img").src = e.target.result;
                                      localStorage.setItem("profile_image", e.target.result);
                                      $$("profile_image_container").refresh();
                                      // showChangeIndicator("profile_image");
                                    };
                                    reader.readAsDataURL(file.file);
                                    return false;
                                  }
                                }
                              }
                            ],
                            width: 200,
                            gravity: 0.4
                          },
                          {
                            width: 30
                          },
                          {
                            // Profile form
                            view: "form",
                            id: "profile_form",
                            gravity: 0.6,
                            minWidth: 300,
                            elementsConfig: {
                              labelWidth: 140,
                              labelAlign: "right"
                            },
                            elements: [
                              {
                                view: "text",
                                label: "Full Name",
                                name: "full_name",
                                placeholder: "Enter your full name",
                                css: "modern-input",
                                validate: webix.rules.isNotEmpty,
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("full_name");
                                  }
                                }
                              },
                              {
                                view: "text",
                                label: "Display Name",
                                name: "display_name",
                                placeholder: "How others see you",
                                css: "modern-input",
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("display_name");
                                  }
                                }
                              },
                              {
                                view: "text",
                                label: "Email Address",
                                name: "email",
                                type: "email",
                                disabled: true,
                                css: "modern-input disabled-field",
                                tooltip: "Email cannot be changed. Contact support if needed."
                              },
                              {
                                view: "text",
                                label: "Phone Number",
                                name: "phone",
                                placeholder: "+1 (555) 123-4567",
                                css: "modern-input",
                                validate: function (value) {
                                  return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value);
                                },
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("phone");
                                  }
                                }
                              },
                              {
                                view: "text",
                                label: "Job Title",
                                name: "job_title",
                                placeholder: "Your current position",
                                css: "modern-input",
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("job_title");
                                  }
                                }
                              },
                              {
                                view: "textarea",
                                label: "Bio",
                                name: "bio",
                                placeholder: "Tell us about yourself...",
                                height: 80,
                                css: "modern-textarea",
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("bio");
                                  }
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        height: 30
                      },
                      {
                        // Action buttons
                        cols: [
                          {},
                          {
                            view: "button",
                            value: "Reset Changes",
                            minWidth: 120,  
                            height: 45,
                            tooltip: "Reset(alt+r)",
                            hotkey: "alt+r",
                            css: "primary-button",
                            click: function () {
                              $$("profile_form").clear();
                              loadUserProfile();
                              // clearChangeIndicators();
                            }
                          },
                          {
                            width: 10
                          },
                          {
                            view: "button",
                            value: "Save Profile",
                            minWidth: 120,  
                            height: 45,
                            tooltip: "Save Profile(alt+s)",
                            hotkey: "alt+s",
                            css: "primary-button",
                            click: async function () {
                              const token = localStorage.getItem("authToken");
                              if (!token) {
                                webix.message({ type: "error", text: "Please log in to save your profile" });
                                return;
                              }

                              const form = $$("profile_form");
                              if (!form.validate()) {
                                webix.message({ type: "error", text: "Please fix the errors in the form" });
                                return;
                              }
                              const values = form.getValues();
                              await saveProfile();
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            {
              // Personal details tab
              id: "personal",
              rows: [
                {
                  template: "<div class='section-header'><h2>Personal Details</h2><p>Manage your personal information</p></div>",
                  type: "header",
                  height: 60,
                  css: "section-title"
                },
                {
                  view: "scrollview",
                  scroll: "y",
                  body: {
                    rows: [
                      {
                        view: "form",
                        id: "personal_form",
                        elementsConfig: {
                          labelWidth: 140,
                          labelAlign: "right"
                        },
                        elements: [
                          {
                            cols: [
                              {
                                view: "datepicker",
                                label: "Date of Birth",
                                name: "date_of_birth",
                                format: "%d %M %Y",
                                css: "modern-input",
                                gravity: 1,
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("date_of_birth");
                                  }
                                }
                              },
                              {
                                width: 20
                              },
                              {
                                view: "richselect",
                                label: "Gender",
                                name: "gender",
                                css: "modern-select",
                                options: [
                                  { id: "male", value: "Male" },
                                  { id: "female", value: "Female" },
                                  { id: "other", value: "Other" },
                                  { id: "prefer_not_to_say", value: "Prefer not to say" }
                                ],
                                gravity: 1,
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("gender");
                                  }
                                }
                              }
                            ]
                          },
                          {
                            view: "richselect",
                            label: "Marital Status",
                            name: "marital_status",
                            css: "modern-select",
                            options: [
                              "Single",
                              "Married",
                              "Divorced",
                              "Widowed",
                              "In a relationship",
                              "Other"
                            ],
                            on: {
                              onChange: function() {
                                // showChangeIndicator("marital_status");
                              }
                            }
                          },
                          {
                            view: "text",
                            label: "Occupation",
                            name: "occupation",
                            placeholder: "Your profession or job",
                            css: "modern-input",
                            on: {
                              onChange: function() {
                                // showChangeIndicator("occupation");
                              }
                            }
                          },
                          {
                            view: "text",
                            label: "Company",
                            name: "company",
                            placeholder: "Where do you work?",
                            css: "modern-input",
                            on: {
                              onChange: function() {
                                // showChangeIndicator("company");
                              }
                            }
                          },
                          {
                            view: "textarea",
                            label: "Address",
                            name: "address",
                            placeholder: "Your full address",
                            height: 80,
                            css: "modern-textarea",
                            on: {
                              onChange: function() {
                                // showChangeIndicator("address");
                              }
                            }
                          },
                          {
                            cols: [
                              {
                                view: "text",
                                label: "City",
                                name: "city",
                                placeholder: "City",
                                css: "modern-input",
                                gravity: 1,
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("city");
                                  }
                                }
                              },
                              {
                                width: 20
                              },
                              {
                                view: "text",
                                label: "State/Province",
                                name: "state",
                                placeholder: "State",
                                css: "modern-input",
                                gravity: 1,
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("state");
                                  }
                                }
                              },
                              {
                                width: 20
                              },
                              {
                                view: "text",
                                label: "ZIP Code",
                                name: "zip_code",
                                placeholder: "12345",
                                css: "modern-input",
                                gravity: 0.7,
                                on: {
                                  onChange: function() {
                                    // showChangeIndicator("zip_code");
                                  }
                                }
                              }
                            ]
                          },
                          {
                            view: "richselect",
                            label: "Country",
                            name: "country",
                            css: "modern-select",
                            options: [
                              "United States",
                              "Canada",
                              "United Kingdom",
                              "Australia",
                              "Germany",
                              "France",
                              "Other"
                            ],
                            on: {
                              onChange: function() {
                                // showChangeIndicator("country");
                              }
                            }
                          }
                        ]
                      },
                      {
                        height: 30
                      },
                      {
                        cols: [
                          {},
                          {
                            view: "button",
                            value: "Reset",
                            minWidth: 120,  
                            height: 45,
                            css: "primary-button",
                            tooltip: "Reset(alt+r)",
                            hotkey: "alt+r",
                            click: function () {
                              $$("personal_form").clear();
                              loadPersonalDetails();
                              clearChangeIndicators();
                            }
                          },
                          {
                            width: 10
                          },
                          {
                            view: "button",
                            value: "Save Details",
                            minWidth: 120,  
                            height: 45,
                            css: "primary-button",
                            tooltip: "Save Details(alt+s)",
                            hotkey: "alt+s",
                            click: async function () {
                              try {
                                const values = $$("personal_form").getValues();
                                await apiService.put('/profilefile/', values);
                                webix.message({ type: "success", text: "Personal details saved successfully!" });
                                clearChangeIndicators();
                              } catch (error) {
                                console.error('Error saving personal details:', error);
                                webix.message({ type: "error", text: "Failed to save personal details" });
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            {
              // Security tab
              id: "security",
              rows: [
                {
                  template: "<div class='section-header'><h2>Security & Password</h2><p>Keep your account secure</p></div>",
                  type: "header",
                  height: 60,
                  css: "section-title"
                },
                {
                  view: "scrollview",
                  scroll: "y",
                  body: {
                    rows: [
                      {
                        view: "form",
                        id: "security_form",
                        elementsConfig: {
                          labelWidth: 160,
                          labelAlign: "right"
                        },
                        elements: [
                          {
                            template: "<div class='form-section-title'>Change Password</div>",
                            height: 40,
                            css: "form-section-header"
                          },
                          {
                            view: "text",
                            type: "password",
                            label: "Current Password",
                            name: "current_password",
                            placeholder: "Enter current password",
                            css: "modern-input",
                            validate: webix.rules.isNotEmpty
                          },
                          {
                            view: "text",
                            type: "password",
                            label: "New Password",
                            name: "new_password",
                            placeholder: "Enter new password",
                            css: "modern-input",
                            validate: function (value) {
                              return value.length >= 8;
                            }
                          },
                          {
                            view: "text",
                            type: "password",
                            label: "Confirm Password",
                            name: "confirm_password",
                            placeholder: "Confirm new password",
                            css: "modern-input",
                            validate: function (value) {
                              return value === $$("security_form").getValues().new_password;
                            }
                          },
                          {
                            template: `
                              <div class='password-requirements'>
                                <h4>Password Requirements:</h4>
                                <ul>
                                  <li>At least 8 characters long</li>
                                  <li>Contains uppercase and lowercase letters</li>
                                  <li>Contains at least one number</li>
                                  <li>Contains at least one special character</li>
                                </ul>
                              </div>
                            `,
                            height: 120,
                            css: "info-box"
                          },
                          {
                            height: 20
                          },
                          {
                            template: "<div class='form-section-title'>Two-Factor Authentication</div>",
                            height: 40,
                            css: "form-section-header"
                          },
                          {
                            view: "checkbox",
                            label: "Enable Two-Factor Authentication",
                            name: "two_factor_enabled",
                            css: "modern-checkbox",
                            on: {
                              onChange: function() {
                                // showChangeIndicator("two_factor_enabled");
                              }
                            }
                          },
                          {
                            template: `
                              <div class='info-box'>
                                <p>Two-factor authentication adds an extra layer of security to your account by requiring a second form of verification.</p>
                              </div>
                            `,
                            height: 60,
                            css: "info-box"
                          }
                        ]
                      },
                      {
                        height: 30
                      },
                      {
                        cols: [
                          {},
                          {
                            view: "button",
                            value: "Update Password",
                            minWidth: 120,  
                            height: 45,
                            css: "primary-button",
                            tooltip: "Update Password(alt+s)",
                            hotkey: "alt+s",
                            click: async function () {
                              const form = $$("security_form");
                              const values = form.getValues();
                              
                              if (!form.validate()) {
                                webix.message({ type: "error", text: "Please fix the errors in the form" });
                                return;
                              }
                              
                              if (values.new_password !== values.confirm_password) {
                                webix.message({ type: "error", text: "Passwords do not match" });
                                return;
                              }
                              
                              if (values.new_password.length < 8) {
                                webix.message({ type: "error", text: "Password must be at least 8 characters long" });
                                return;
                              }
                              
                              try {
                                await apiService.put('/profile/', values);
                                webix.message({ type: "success", text: "Password updated successfully!" });
                                form.setValues({ current_password: "", new_password: "", confirm_password: "" });
                                clearChangeIndicators();
                              } catch (error) {
                                console.error('Error updating password:', error);
                                webix.message({ type: "error", text: "Failed to update password" });
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            
          ]
        }
      ]
    }
  ],
  // on: {
  //   onShow: function() {
  //     loadUserProfile();
  //     loadPersonalDetails();
  //     loadSecuritySettings();
  //     // loadPreferences();
  //   }
  // }
};


// Load functions
// async function loadUserProfile() {
//   try {
//     // const token = localStorage.getItem("authToken");
//     if (!token) {
//       webix.message({ type: "error", text: "Please log in to access your profile" });
//       return;
//     }

//     const response = await apiService.get('/profile/');
//     if (response.data) {
//       $$("profile_form").setValues(response.data);
//     }
//   } catch (error) {
//     console.error('Error loading profile:', error);
//     if (error.response && error.response.status === 401) {
//       webix.message({ type: "error", text: "Your session has expired. Please log in again." });
//       // Redirect to login page
//       $$("main_content").setValue("login");
//     } else {
//       webix.message({ type: "error", text: "Failed to load profile" });
//     }
//   }
// }

// async function loadPersonalDetails() {
//   try {
//     const response = await apiService.get('/profile/' ,
//       {
//         headers: {
//           'Authorization': `Token ${token}`
//         } 
//       }
//     );
//     if (response.data) {
//       $$("personal_form").setValues(response.data);
//     }
//   } catch (error) {
//     console.error('Error loading personal details:', error);
//     webix.message({ type: "error", text: "Failed to load personal details" });
//   }
// }

// async function loadSecuritySettings() {
//   try {
//     const response = await apiService.get('/profile/');
//     if (response.data) {
//       $$("security_form").setValues(response.data);
//     }
//   } catch (error) {
//     console.error('Error loading security settings:', error);
//     webix.message({ type: "error", text: "Failed to load security settings" });
//   }
// }



// async function saveProfile() {
//   try {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       webix.message({ type: "error", text: "Please log in to save your profile" });
//       return;
//     }

//     const form = $$("profile_form");
//     if (!form.validate()) {
//       webix.message({ type: "error", text: "Please fix the errors in the form" });
//       return;
//     }
//     const values = form.getValues();
//     await apiService.put('/profile/', values);
//     webix.message({ type: "success", text: "Profile updated successfully!" });
//     clearChangeIndicators();
    
  
//     window.dispatchEvent(new CustomEvent('profileUpdated', {
//       detail: {
//         displayName: values.display_name,
//         fullName: values.full_name
//       }
//     }));
//   } catch (error) {
//     console.error('Error saving profile:', error);
//     if (error.response && error.response.status === 401) {
//       webix.message({ type: "error", text: "Your session has expired. Please log in again." });
   
//       $$("main_content").setValue("login");
//     } else {
//       webix.message({ type: "error", text: "Failed to save profile" });
//     }
//   }
// }


const style = document.createElement('style');
style.textContent = `
  .changed {
    border-color: #4CAF50 !important;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2) !important;
  }

  .change-indicator {
    position: absolute;
    right: -25px;
    top: 50%;
    transform: translateY(-50%);
    color: #4CAF50;
    font-size: 16px;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-50%) scale(0.8); }
    to { opacity: 1; transform: translateY(-50%) scale(1); }
  }

  .modern-input, .modern-select, .modern-textarea {
    position: relative;
    transition: all 0.3s ease;
  }

  .modern-input:focus, .modern-select:focus, .modern-textarea:focus {
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;
document.head.appendChild(style);