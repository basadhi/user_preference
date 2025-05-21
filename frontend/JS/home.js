import { settings } from "./settings.js";

export const HomeUI = {
    id: "home_ui",
    type: "clean",
    scroll: "y",
    rows: [
        {
            view: "template",
            template: "<h1 style='text-align: center; padding: 20px;'>Welcome to User Preferences</h1>",
            height: 80
        },
        {
            cols: [
                { gravity: 1 }, // Left spacer with flexible width
                {
                    view: "form",
                    id: "login_form",
                    width: 400,
                    minWidth: 300,
                    gravity: 3,
                    css: "login-form",
                    margin: 20,
                    elements: [
                        { view: "text", label: "Email", name: "email", placeholder: "Enter your email", labelWidth: 100 },
                        { view: "text", label: "Password", type: "password", name: "password", placeholder: "Enter your password", labelWidth: 100 },
                        {
                            cols: [
                                {
                                    view: "button",
                                    value: "Login",
                                    css: "webix_primary",
                                    click: function () {
                                        //$$("main_content").setValue("login");
                                        webix.message("Login clicked");
                                    }
                                },
                                {
                                    view: "button",
                                    value: "Sign Up",
                                    css: "webix_secondary",
                                    click: function () {
                                        $$("main_content").setValue("signup");
                                        webix.message("Sign Up clicked");
                                    }
                                }
                            ]
                        },
                        { height: 20 },
                        {
                            view: "button",
                            value: "Settings ⚙️",
                            css: "webix_info",
                            click: function () {
                                $$("main_content").setValue("settings_page");
                            }
                        }
                    ]
                },
                {
                    rows: [
                        {
                            view: "template",
                            template: "<div class='info-panel'><h3>Quick Information</h3><p>Access your personalized settings and preferences.</p></div>",
                            css: "info-box",
                            height: 120,
                            width: 250,
                            minWidth: 200,
                            gravity: 2
                        },
                        {} // Empty spacer to push content to top
                    ],
                    gravity: 2
                },
                { gravity: 1 } // Right spacer with flexible width
            ]
        },
        { // Bottom spacer
            height: 50
        }
    ]
};