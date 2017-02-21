var app = angular.module('invoiceData', []);
app.controller('MasterDetail',
function ($scope, $http) {

    //  Load the list of Invoices from the JSON file into this variable
    $scope.listOfInvoices = null;

    //  When the user selects an "Invoice" from our MasterView list, then system will set the following variable.
    $scope.selectedInvoice = null;

    $http.get('data/invoice.json')

        .success(function (data) {
            $scope.listOfInvoices = data.getAllInvoices;

            if ($scope.listOfInvoices.length > 0) {

                //  If there would be more than one record, then the first record would be selected by default.
                $scope.selectedInvoice = $scope.listOfInvoices[0].account_name;

                //  Load the Invoice detail of the selected invoice.
                $scope.loadOrders();
            }
        })
        .error(function (data, status, headers, config) {
            $scope.errorMessage = "Couldn't load the list of invoices, error # " + status;
        });

    $scope.selectInvoice = function (val) {
        //  If the user clicks on a <div>, we can get the ng-click to call this function, to set a new selected Invoice.
        $scope.selectedInvoice = val.account_name;
        $scope.loadInvoice();
    }

    $scope.loadInvoice = function () {
        //  Reset invoice detail  (when binded, this'll ensure the previous invoice detail disappears from the screen while we're loading our JSON data)
        $scope.InvoiceDetail = null;

        //  The user has selected an Invoice from Invoice List.  Now it'll load the Invoice detail.
        $http.get('data/invoice.json')
                .success(function (data) {
                    $scope.InvoiceDetail = data.getAllInvoices;
                })
                .error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of Invoices, error # " + status;
                });
    }

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true then make it false and vice versa
    }

});
