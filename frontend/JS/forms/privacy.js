export const PrivacyForm = {
    id: "privacy_settings_cell",
    view: "scrollview",
    responsive: true,
    scroll:"y",
    body:{
    rows: [
        {
            template: "<h2>Privacy Settings</h2>",
            height: 50,
            css: "privacy-settings-header"
        },
        {
            view: "flexlayout",
            responsiveCell: true,
            cols: [
                {
                    view: "form",
                    id: "profile-picture-settings",
                    borderless: true,
                    minWidth: 300,
                    rows: [
                        { 
                            template: "<h3>Profile Picture Settings</h3>", 
                            height: 40,
                            css: "settings-section-header"
                        },
                        {
                            view: "select",
                            label: "Profile Picture Visibility",
                            name: "profile_pic_visibility",
                            labelPosition: "top",
                            value: "everyone",
                            options: [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends", value: "Friends Only" },
                                { id: "private", value: "Only Me" }
                            ]
                        },
                        {
                            view: "select",
                            label: "Who can download or save your profile picture",
                            name: "profile_pic_download",
                            labelPosition: "top",
                            value: "everyone",
                            options: [
                                { id: "no_one", value: "No One" },
                                { id: "friends", value: "Friends Only" },
                                { id: "everyone", value: "Everyone" }
                            ]
                        }
                    ]
                },
                {
                    view: "form",
                    id: "account-privacy",
                    borderless: true,
                    minWidth: 300,
                    rows: [
                        { 
                            template: "<h3>Account Privacy</h3>", 
                            height: 40,
                            css: "settings-section-header"
                        },
                        {
                            view: "select",
                            label: "Profile Visibility",
                            name: "account_privacy",
                            labelPosition: "top",
                            value: "everyone",
                            options: [
                                { id: "public", value: "Public" },
                                { id: "friends", value: "Friends Only" },
                                { id: "private", value: "Only Me" }
                            ]
                        },
                        {
                            view: "select",
                            label: "Who can send you connection requests",
                            name: "connection_requests",
                            labelPosition: "top",
                            value: "everyone",
                            options: [
                                { id: "everyone", value: "Everyone" },
                                { id: "friends_of_friends", value: "Friends of Friends" },
                                { id: "no_one", value: "No One" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            view: "flexlayout",
            responsiveCell: true,
            cols: [
                {
                    view: "form",
                    id: "data-sharing-preferences",
                    borderless: true,
                    minWidth: 300,
                    rows: [
                        { 
                            template: "<h3>Data Sharing Preferences</h3>", 
                            height: 40,
                            css: "settings-section-header"
                        },
                        {
                            view: "checkbox",
                            labelRight: "Allow search engines to index my profile",
                            name: "search_engine_visibility",
                            labelWidth: 0,
                            value:0,
                        },
                        {
                            view: "checkbox",
                            labelRight: "Allow third-party apps to access my data",
                            name: "third_party_access",
                            labelWidth: 0,
                            value:0,
                        },
                        {
                            view: "checkbox",
                            labelRight: "Show my active status",
                            name: "active_status_visibility",
                            labelWidth: 0,
                            value:0,
                        },
                        {
                            view: "checkbox",
                            labelRight: "Allow profile views tracking",
                            name: "profile_view_tracking",
                            labelWidth: 0,
                            value:0,
                        }
                    ]
                },
                {
                    view: "form",
                    id: "advanced-privacy-controls",
                    borderless: true,
                    minWidth: 300,
                    rows: [
                        { 
                            template: "<h3>Advanced Privacy Controls</h3>", 
                            height: 40,
                            css: "settings-section-header"
                        },
                        {
                            view: "select",
                            label: "Data Retention Period",
                            name: "data_retention",
                            labelPosition: "top",
                            value: "1_month",
                            options: [
                                { id: "1_month", value: "1 Month" },
                                { id: "3_months", value: "3 Months" },
                                { id: "6_months", value: "6 Months" },
                                { id: "1_year", value: "1 Year" },
                                { id: "forever", value: "Forever" }
                            ]
                        },
                        {
                            view: "select",
                            label: "Data Export Options",
                            name: "data_export",
                            labelPosition: "top",
                            value: "full",
                            options: [
                                { id: "full", value: "Full Export" },
                                { id: "minimal", value: "Minimal Export" },
                                { id: "no_export", value: "No Export" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            cols: [
                { gravity: 1 },
                {
                    view: "button", 
                    value: "Save Changes", 
                    css: "webix_primary",
                    click: function() {
                        webix.confirm({
                            title: "Save Privacy Settings",
                            text: "Are you sure you want to save these privacy settings?",
                            callback: function(result) {
                                if (result) {
                                    webix.message({
                                        type: "success",
                                        text: "Privacy settings updated successfully!"
                                    });
                                }
                            }
                        });
                    }
                },
                {
                    view: "button", 
                    value: "Reset to Default", 
                    css: "webix_secondary",
                    click: function() {
                        webix.confirm({
                            title: "Reset Settings",
                            text: "Are you sure you want to reset all privacy settings to default?",
                            callback: function(result) {
                                if (result) {
                                    // Reset profile picture settings
                                    $$("profile-picture-settings").setValues({
                                        profile_pic_visibility: "everyone",
                                        profile_pic_download: "everyone"
                                    });
                
                                    // Reset account privacy settings
                                    $$("account-privacy").setValues({
                                        account_privacy: "public",
                                        connection_requests: "everyone"
                                    });
                
                                    // Reset data sharing preferences
                                    $$("data-sharing-preferences").setValues({
                                        search_engine_visibility: 0,
                                        third_party_access: 0,
                                        active_status_visibility: 0,
                                        profile_view_tracking: 0
                                    });
                
                                    // Reset advanced privacy controls
                                    $$("advanced-privacy-controls").setValues({
                                        data_retention: "1_month",
                                        data_export: "full"
                                    });
                
                                    webix.message({
                                        type: "success",
                                        text: "Privacy settings reset to default!"
                                    });
                                }
                            }
                        });
                    }
                }
,                
                { gravity: 1 }
            ]
        }
    ]}
};

