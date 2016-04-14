angular
    .module("kwik",['ui.router', 'oc.lazyLoad', 'ui.bootstrap'])

    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        });
    }]);