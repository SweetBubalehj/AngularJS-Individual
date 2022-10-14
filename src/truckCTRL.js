app.service("auth", function () {
    const users = [
        {
            login: "truck",
            password: "moldova",
        },
    ];

    this.checkUser = (user) => {
        const resultName = users.find((obj) => obj.login === user.login);
        if (!resultName) return "name";
        if (resultName.password !== user.password) return "password";
        return resultName;
    };
});


app.controller('truckCtrl', function ($scope, auth) {
    $scope.routes = [
        { "title": "Стамбул", "country": "Турция", "time": "1-3 дня", "pricePerTonne": 50},
        { "title": "Москва", "country": "Россия", "time": "2-6 дней", "pricePerTonne": 100},
        { "title": "Бухарест", "country": "Румыния", "time": "10-20 часов", "pricePerTonne": 20},
        { "title": "София", "country": "Болгария", "time": "1-3 дня", "pricePerTonne": 45},
        { "title": "Рим", "country": "Италия", "time": "2-7 дней", "pricePerTonne": 115},
        { "title": "Белград", "country": "Сербия", "time": "1-3 дней", "pricePerTonne": 50},
        { "title": "Берлин", "country": "Германия", "time": "2-5 дней", "pricePerTonne": 75},
        { "title": "Будапешт", "country": "Венгрия", "time": "1-3 дня", "pricePerTonne": 50},
        { "title": "Мадрид", "country": "Испания", "time": "3-8 дней", "pricePerTonne": 180},
        { "title": "Вена", "country": "Австрия", "time": "2-4 дня", "pricePerTonne": 65},
        { "title": "Кошице", "country": "Словакия", "time": "1-3 дня", "pricePerTonne": 45},
        { "title": "Прага", "country": "Чехия", "time": "2-5 дней", "pricePerTonne": 80},
        { "title": "Париж", "country": "Франция", "time": "2-7 дней", "pricePerTonne": 125},
    ];


    $scope.removeRoute = function(routeTitle) {
        const index = $scope.routes.findIndex(x => x.title === routeTitle);

        $scope.routes.splice(index, 1);

        console.log(index);
    }


    $scope.addRoute = function() {
        newRoute = {
            title: "Город",
            country: "Страна",
            time: "1 день",
            price: 0,
        }

        $scope.routes.push(newRoute);
    }


    $scope.added = [
        {
            info: ' ',
            price: parseInt(0)
        }
    ]

    $scope.isSignIn = false;
    $scope.editing = false;

    $scope.currentUser = { login: "undefined" };
    $scope.message = "";

    $scope.signIn = function () {
        const result = auth.checkUser($scope.user);
        if (result === "name" || result === "password") {
            $scope.message = result === "name" ? "Ошибка! Введите правильный логин!" : "Ошибка! Введите правильный пароль!";
            auth.addBadLogins();
        } else {
            $scope.isSignIn = true;
                document.getElementById('myModal').style.display = "none"
        }
    };

    $scope.orderByMe = function(route) {
        $scope.myOrderBy = route;
        $scope.reverseOrder();
    }

    $scope.myReverseBy = false;
    $scope.reverseOrder = function() {
        $scope.myReverseBy = !($scope.myReverseBy);
    }
});