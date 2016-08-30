(function () {
    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_SJtTfTbo";
    let appSecret = "8e4b5df1f38940938a81b53c1ec0f626";
    let _guestCredentials = "53e49fcb-541d-483e-b961-e7b03739ddad.pLnA9QpjkuVUqFHhJXlLKF73aEIoReHk8C5demhtCx4=";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let postView = new PostView(selector, mainContentSelector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });

    onRoute("#/post-:id", function () {
        let top = $("#post-" + this.params['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/users", function () {
        userController.showUsersPage();
    });

    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        let data = {
            fullname: sessionStorage['fullname']
        };
        postController.showCreatePostPage(data, authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createPost(data);
    });

    bindEventHandler('deletePost', function (ev, data) {
        homeController.deletePost(data);
    });

    bindEventHandler('ratePost', function (ev, data) {
        homeController.ratePost(data);
    });

    bindEventHandler('editPost', function (ev, data) {
        postController.showEditPostPage(data, authService.isLoggedIn());
    });

    bindEventHandler('editPostRequest', function (ev, data) {
        postController.editPost(data);
    });

    bindEventHandler('sortPosts', function (ev, data) {
        homeController.showUserPage(data);
    });

    bindEventHandler('commentPost', function (ev, data) {
        postController.commentPost(data);
    });
    
    run('#/');
    
})();
