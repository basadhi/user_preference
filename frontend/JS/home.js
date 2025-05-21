import { settings } from "./settings.js";

export const HomeUI = {
    id: "home_ui",
    type: "clean",
    scroll: true,  // Enable vertical scrolling
    css: "modern-home-ui",
    rows: [
        // Modern Header with background image and welcome text
        {
            view: "template",
            height: 400,
            css: "modern-header-banner",
            template: function() {
                const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
                return `
                    <div class="header-content">
                        <div class="header-content-inner">
                            <div class="avatar-container">
                                <img class="avatar" src="../assets/images/4957136_4957136.jpg" alt="User Avatar" />
                            </div>
                            <div class="header-text">
                                <h1 class="header-title">
                                    ${loggedUser ? `Welcome back, ${loggedUser.first_name}!` : "Welcome to User Preferences!"}
                                </h1>
                                <p class="subtitle">Your personal preferences at a glance</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        },

        // Main content area with responsive layout
        {
            view: "scrollview",
            scroll: "y",
            body: {
                type: "clean",
                rows: [
                    
                    // Card layout for content
                    {
                        type: "clean",
                        cols: [
                            { gravity: 0.5, minWidth: 20 },  // Left margin
                            {
                                // Left column
                                gravity: 2,
                                minWidth: 300,
                                rows: [
                                    {
                                        view: "form",
                                        id: "login_form",
                                        css: "modern-login-card",
                                        elements: [
                                            {
                                                view: "template",
                                                height: 70,
                                                // css: "form-header",
                                                template: "<h2>Account Access</h2>"
                                            },
                                            {
                                                view: "button",
                                                value: "Login",
                                                icon: "mdi mdi-login",
                                                css: "webix_primary btn-modern",
                                                height: 50,
                                                click: function() {
                                                    $$("main_content").setValue("login");
                                                }
                                            },
                                            { height: 15 },
                                            {
                                                view: "button",
                                                value: "Sign Up",
                                                icon: "mdi mdi-account-plus",
                                                css: "webix_secondary btn-modern",
                                                height: 50,
                                                click: function() {
                                                    $$("main_content").setValue("signup");
                                                }
                                            },
                                            { height: 15 },
                                            {
                                                view: "button",
                                                id: "settings_button",
                                                value: "Settings",
                                                icon: "mdi mdi-cog",
                                                hidden: false,
                                                css: "webix_info btn-modern",
                                                height: 50,
                                                click: function() {
                                                    $$("main_content").setValue("settings_page");
                                                }
                                            }
                                        ]
                                    },
                                    { height: 30 }  // Bottom spacing
                                ]
                            },
                            { width: 30 },  // Spacing between columns
                            {
                                // Right column with info cards
                                gravity: 3,
                                minWidth: 300,
                                rows: [
                                    {
                                        view: "template",
                                        height: 180,
                                        css: "modern-info-card",
                                        template: function() {
                                            const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
                                            return `
                                                <div class="info-content">
                                                    <div class="info-icon-container">
                                                        <span class="mdi mdi-information-outline info-icon"></span>
                                                    </div>
                                                    <div class="info-text">
                                                        <h3>Quick Info</h3>
                                                        <p>${loggedUser
                                                            ? "Access and adjust your security preferences. Manage your account settings and notification preferences from the settings panel."
                                                            : "Log in or sign up to access your personalized dashboard and security settings."}
                                                        </p>
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    },
                                    { height: 20 },
                                    {
                                        view: "template",
                                        height: 180,
                                        css: "modern-feature-card",
                                        template: `
                                            <div class="feature-content">
                                                <div class="feature-icon-container">
                                                    <span class="mdi mdi-shield-check feature-icon"></span>
                                                </div>
                                                <div class="feature-text">
                                                    <h3>User Preferences Features</h3>
                                                    <ul class="feature-list">
                                                        <li>Real-time security monitoring</li>
                                                        <li>Customizable alert preferences</li>
                                                        <li>Comprehensive activity logs</li>
                                                        <li>Advanced privacy controls</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        `
                                    },
                                    { height: 30 }  // Bottom spacing
                                ]
                            },
                            { gravity: 0.2, minWidth: 20 }  // Right margin
                        ]
                    }
                ]
            }
        }
    ],
    on: {
        onShow: function() {
            const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
            const settingsButton = $$("settings_button");
            
            if (loggedUser) {
                settingsButton.show();
            } else {
                settingsButton.hide();
            }
            
            // Add responsive behavior
            this.adjustLayout();
            webix.event(window, "resize", () => this.adjustLayout());
        }
    },
    adjustLayout: function() {
        const width = window.innerWidth;
        // Responsive layout adjustments can be added here if needed
    }
};

// Add these CSS styles to your stylesheet
/*
.modern-home-ui {
    background-color: #f5f7fa;
    font-family: 'Roboto', sans-serif;
}

.modern-header-banner {
    background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    padding: 0 20px;
}

.header-content-inner {
    display: flex;
    align-items: center;
    max-width: 1200px;
    width: 100%;
}

.avatar-container {
    margin-right: 20px;
}

.avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.header-text {
    flex: 1;
}

.header-title {
    font-size: 32px;
    font-weight: 600;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
    font-size: 18px;
    font-weight: 300;
    margin: 0;
    opacity: 0.9;
}

.modern-login-card, .modern-info-card, .modern-feature-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 20px;
}

.form-header h2 {
    font-size: 22px;
    font-weight: 500;
    color: #333;
    margin: 0;
    text-align: center;
}

.btn-modern {
    border-radius: 8px !important;
    font-weight: 500 !important;
    font-size: 16px !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    transition: all 0.2s ease !important;
}

.btn-modern:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
}

.info-content, .feature-content {
    display: flex;
    align-items: flex-start;
    padding: 5px;
}

.info-icon-container, .feature-icon-container {
    margin-right: 15px;
}

.info-icon, .feature-icon {
    font-size: 36px;
    color: #8E54E9;
}

.info-text h3, .feature-text h3 {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin: 0 0 10px 0;
}

.info-text p {
    font-size: 15px;
    line-height: 1.5;
    color: #666;
    margin: 0;
}

.feature-list {
    margin: 10px 0 0 0;
    padding-left: 20px;
    color: #666;
}

.feature-list li {
    margin-bottom: 6px;
    font-size: 14px;
}
*/