/**
 * Created by skitsanos on 8/10/17.
 */
webix.ready(function ()
{
    webix.ui({
        view: 'scrollview',
        body: {
            rows: [
                {
                    view: 'toolbar',
                    css: 'app-header',
                    elements: [
                        {view: 'label', template: '<span class="app_title">Webix Core app</span>'}, {},
                        {},
                        {view: 'icon', width: 40, icon: 'info'}

                    ]
                },
                {
                    cols: [
                        {},
                        {
                            rows: [
                                {},
                                {
                                    view: "form",
                                    id: "log_form",
                                    width: 300,
                                    elements: [
                                        {view: "text", label: "Username", name: "username"},
                                        {view: "text", type: "password", label: "Password", name: "password"},
                                        {
                                            margin: 5, cols: [
                                            {view: "button", value: "Login", type: "form"},
                                            {view: "button", value: "Signup"}
                                        ]
                                        }
                                    ]
                                },
                                {}
                            ]
                        },
                        {}
                    ]
                }
            ]
        }
    });
});
