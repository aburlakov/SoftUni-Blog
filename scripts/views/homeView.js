class HomeView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    /*Render guests page*/
    showGuestPage(sideBarData, mainData) {
        Mustache.escape = function (value) {
            return value;
        };
        let _that = this;
        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            /*Render posts in sidebar*/
            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };
                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);
            });
            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);

            });
        });
    }

    /*Render registered users page*/
    showUserPage(sideBarData, mainData) {
        Mustache.escape = function (value) {
            return value;
        };
        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $('.pagination').hide();
            /*Render posts in sidebar*/
            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };
                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);
            });
            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });
        });
    }
}

