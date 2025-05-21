// import { AccountForm, PrivacyForm, NotificationsForm, ThemeForm } from "./form_components.js";

// export const form_settings = {
//     id: "form_settings",
//     responsive: true,
//     type: "clean",
//     rows: [
//         {
//             view: "tabbar",
//             id: "settings_tabbar",
//             multiview: true,
//             target: "settings_multiview",
//             value: "fs_account_settings",
//             options: [
//                 { id: "fs_account_settings", value: "Account" },
//                 { id: "fs_privacy_settings", value: "Privacy" },
//                 { id: "fs_notifications_settings", value: "Notifications" },
//                 { id: "fs_theme_settings", value: "Theme" }
//             ]
//         },
//         {
//             view: "multiview",
//             id: "settings_multiview",
//             cells: [
//                 { id: "fs_account_settings", ...AccountForm },
//                 { id: "fs_privacy_settings", ...PrivacyForm },
//                 { id: "fs_notifications_settings", ...NotificationsForm },
//                 { id: "fs_theme_settings", ...ThemeForm }
//             ]
//         },
//         {
//             view: "button",
//             value: "Back",
//             click: function () {
//                 $$("main_content").setValue("home_ui");
//             }
//         }
//     ]
// };
