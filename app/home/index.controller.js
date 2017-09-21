(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.search = null;
        vm.searchData = null;
        vm.saveSearch = saveSearch;
        vm.arr = null;

        initController();
        getSearch();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function getSearch() {
            UserService.getSearch()
                .then(function (data) {
                    vm.searchData = data;
                    getList();
                })
        }

        vm.executeSearch = function () {
            alert(vm.selectedName);
        }

        function executeSearch() {
            alert(vm.selectedName);
        }


        function getList() {
            vm.arr = vm.searchData.map(x => x.name);
        }

        function saveSearch() {
            var searchTerms = vm.search.obj;
            var searchArray = Object.keys(searchTerms).map(x => searchTerms[x]);
            var searchObj = {};
            debugger;
            searchObj.name = vm.search.name;
            searchObj.searchArray = searchArray;
            UserService.SaveSearch(searchObj)
                .then(function () {
                    FlashService.Success('User updated');
                    vm.search = {};
                    getSearch();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();