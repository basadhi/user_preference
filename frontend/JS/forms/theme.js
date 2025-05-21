function applyThemeMode(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme", "high-contrast-theme");
    } else if (mode === "light") {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme", "high-contrast-theme");
    } else if (mode === "high-contrast") {
      document.body.classList.add("high-contrast-theme");
      document.body.classList.remove("dark-theme", "light-theme");
    } else {
      // System: use prefers-color-scheme media query
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyThemeMode("dark");
      } else {
        applyThemeMode("light");
      }
    }
  }
  
  function applyPrimaryColor(color) {
    document.documentElement.style.setProperty('--webix-primary', color);
  }
  
  function toggleAnimations(enable) {
    if (!enable) {
      webix.ui.animate = false;
      document.body.classList.add("no-animations");
    } else {
      webix.ui.animate = true;
      document.body.classList.remove("no-animations");
    }
  }
  
  function applyFontFamily(font) {
    
    document.documentElement.style.setProperty('--webix-font-family', font);
   
    document.body.style.fontFamily = font;
    
    // Apply to all webix elements safely
    try {
      // Apply to all webix views
      const webixElements = document.querySelectorAll('.webix_view, .webix_el_box, .webix_el_text, .webix_el_label');
      webixElements.forEach(element => {
        element.style.fontFamily = font;
      });
    } catch (error) {
      console.warn('Error applying font to Webix elements:', error);
    }
  }
  

export const ThemeForm = {
  
  type: "clean",
  rows: [
    {
      view: "template",
      type: "header",
      template: "<span class='mdi mdi-theme-light-dark'></span> Theme Settings",
      
    //   css: "webix_header app_header",
     
    },
    {
      cols: [
        {
          view: "sidebar",
          id: "themeSidebar",
          width: 180,
          height: 500,
          data: [
            { id: "appearance", icon: "mdi mdi-palette", value: "Appearance" },
            { id: "layout", icon: "mdi mdi-view-dashboard-outline", value: "Layout" },
            { id: "accessibility", icon: "mdi mdi-eye", value: "Accessibility" }
          ],
          on: {
            onAfterSelect: function(id) {
              $$("themeFormMultiview").setValue(id);
            }
          }
        },
        {
          view: "multiview",
          id: "themeFormMultiview",
          height: 900,
          responsive: true,
          minWidth: 320,
          scroll: "y",
          cells: [
            {
              id: "appearance",
              rows: [
                {
                  view: "form",
                  id: "appearanceForm",
                  elements: [
                    {
                      cols: [
                        {
                          view: "radio",
                          label: "Theme",
                          labelWidth: 100,
                          name: "theme",
                          value: localStorage.getItem("theme") || "system",
                          options: [
                            { id: "light", value: "<span class='mdi mdi-weather-sunny'></span> Light" },
                            { id: "dark", value: "<span class='mdi mdi-weather-night'></span> Dark" },
                            { id: "high-contrast", value: "<span class='mdi mdi-contrast'></span> High Contrast" },
                            { id: "system", value: "<span class='mdi mdi-monitor'></span> System Default" }
                          ],
                          vertical: true,
                        },
                        {
                          template: "<img src='https://cdn-icons-png.flaticon.com/512/919/919828.png' style='width:100px'>",
                          borderless: true
                        }
                      ]
                    },
                    {
                      view: "select",
                      label: "Font Family",
                      labelWidth: 100,
                      name: "fontFamily",
                      value: localStorage.getItem("fontFamily") || "Arial, sans-serif",
                      options: [
                        { id: "Arial, sans-serif", value: "Arial" },
                        { id: "'Times New Roman', serif", value: "Times New Roman" },
                        { id: "'Courier New', monospace", value: "Courier New" },
                        { id: "'Segoe UI', sans-serif", value: "Segoe UI" },
                        { id: "'Roboto', sans-serif", value: "Roboto" },
                        { id: "'Open Sans', sans-serif", value: "Open Sans" }
                      ]
                    },
                    {
                      view: "colorpicker",
                      label: "Primary Color",
                      labelWidth: 100,
                      name: "primaryColor",
                      value: localStorage.getItem("primaryColor") || "#1CA1C1"
                    },
                    {
                      view: "switch",
                      label: "Enable Animations",
                      labelWidth: 150,
                      name: "animations",
                      value: localStorage.getItem("animations") === "true"
                    },
                    {
                      view: "button",
                      value: "Save Changes",
                      type: "form",
                      css: "webix_primary",
                      click: function () {
                        const form = $$("appearanceForm");
                        const values = form.getValues();
                        console.log("Saving values:", values);
                        
                        // Apply theme settings
                        if (values.theme) {
                          applyThemeMode(values.theme);
                          localStorage.setItem("theme", values.theme);
                          console.log("Theme applied:", values.theme);
                        }
                        
                        // Apply font family
                        if (values.fontFamily) {
                          applyFontFamily(values.fontFamily);
                          localStorage.setItem("fontFamily", values.fontFamily);
                          console.log("Font family applied:", values.fontFamily);
                        }
                        
                        // Apply other settings
                        if (values.primaryColor) {
                          applyPrimaryColor(values.primaryColor);
                          localStorage.setItem("primaryColor", values.primaryColor);
                        }
                        
                        if (values.animations !== undefined) {
                          toggleAnimations(values.animations);
                          localStorage.setItem("animations", values.animations);
                        }
                        
                        webix.message("✔️ Theme settings saved!");
                      }
                    }
                  ],
                  on: {
                    onShow: function() {
                      // Initialize form with saved values
                      const savedTheme = localStorage.getItem("theme") || "system";
                      const savedFont = localStorage.getItem("fontFamily") || "Arial, sans-serif";
                      const savedColor = localStorage.getItem("primaryColor") || "#1CA1C1";
                      const savedAnimations = localStorage.getItem("animations") === "true";
                      
                      this.setValues({
                        theme: savedTheme,
                        fontFamily: savedFont,
                        primaryColor: savedColor,
                        animations: savedAnimations
                      });
                      
                      // Apply saved settings
                      applyThemeMode(savedTheme);
                      applyFontFamily(savedFont);
                      applyPrimaryColor(savedColor);
                      toggleAnimations(savedAnimations);
                    }
                  }
                }
              ]
            },
            {
              id: "layout",
              template: "<div style='padding: 20px;'>Layout options coming soon...</div>"
            },
            {
              id: "accessibility",
              template: "<div style='padding: 20px;'>Accessibility options coming soon...</div>"
            }
          ]
        }
      ]
    }
  ]
};
