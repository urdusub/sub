var postVoteLoading = false;
$('.tags-item').click(function () {
    $('.tags-item').removeClass('active');
    $('.tags-item .active-icon').hide();

    $(this).addClass('active');
    $(this).find('.active-icon').show();

    $('#selected-tags').text($(this).text());
    $('input[name=tags_id]').val($(this).data('id'));
});
var postRecaptcha;
grecaptcha.ready(() => {
    if ($('#post-recaptcha').length > 0) {
        postRecaptcha = grecaptcha.render('post-recaptcha', {
            'sitekey': recaptchaV2SiteKey,
            'callback': function () {
                $('#post-form').addClass('recaptcha-clicked');
            }
        });
    }
});
$('#post-form').submit(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('recaptcha-clicked')) {
        $('#post-error').html(`Please click "I'm not a robot"`);
        $('#post-error').show();

        setTimeout(function () {
            $('#login-error').hide();
        }, 6000);

        return false;
    }

    if (!isLoading) {
        isLoading = true;
        $('#post-loading').show();
        $('#post-error').hide();
        var data = $(this).serializeArray();

        $.post('/ajax/post/create', data, function (res) {
            $('#post-loading').hide();
            isLoading = false;
            if (res.status) {
                toastr.success(res.msg, '', {timeOut: 6000});
                window.location.href = res.redirectUrl;
            } else {
                var err = "";
                if (res.errors && res.errors.length > 0) {
                    res.errors.forEach(e => {
                        err += `<span>- ${e}</span>`;
                    });
                } else {
                    err = res.msg;
                }

                $('#post-error').html(err);
                $('#post-error').show();
                setTimeout(function () {
                    $('#post-error').hide();
                }, 6000);
                grecaptcha.reset(postRecaptcha);
                $('#post-form').removeClass('recaptcha-clicked');
            }
        });
    }
})

$(document).on('click', '.p-btn-vote', function () {
    if (checkLogin()) {
        if (!postVoteLoading) {
            postVoteLoading = true;
            const el = $(this);
            const type = parseInt(el.data('type'));

            const elCurrentVote = $('.p-btn-vote.active');
            if (elCurrentVote.length > 0 && parseInt(elCurrentVote.data('type')) !== type) {
                elCurrentVote.removeClass('active');
                var elCurrentVoteValue = parseInt(elCurrentVote.find('.value').text());
                if (elCurrentVoteValue > 0) {
                    elCurrentVoteValue = elCurrentVoteValue - 1;
                    elCurrentVote.find('.value').text(elCurrentVoteValue > 0 ? elCurrentVoteValue : "");
                }
            }

            el.toggleClass("active");
            var value = parseInt(el.find('.value').text());
            if (value > 0) {
                value = el.hasClass('active') ? (value + 1) : (value - 1);
            } else {
                value = 1;
            }
            el.find('.value').text(value > 0 ? value : "");

            $.post('/ajax/post/vote', {id: post.id, type}, function (res) {
                postVoteLoading = false;
            })
        }
    }
});
$(document).on('click', '.lp-btn-vote', function () {
    if (checkLogin()) {
        if (!postVoteLoading) {
            postVoteLoading = true;
            const el = $(this);
            const type = parseInt(el.data('type')), postId = el.data('id');

            const elCurrentVote = $('.lp-btn-vote.active');
            if (elCurrentVote.length > 0 && parseInt(elCurrentVote.data('type')) !== type) {
                elCurrentVote.removeClass('active');
                var elCurrentVoteValue = parseInt(elCurrentVote.data('type')) === 1 ? $(`#post-${postId} .like-value`) : $(`#post-${postId} .dislike-value`);
                var currentVoteValue = parseInt(elCurrentVoteValue.text());
                if (currentVoteValue > 0) {
                    currentVoteValue = currentVoteValue - 1;

                    elCurrentVoteValue.text(currentVoteValue > 0 ? currentVoteValue : 0);
                }
            }

            el.toggleClass("active");
            var elVoteValue = parseInt(el.data('type')) === 1 ? $(`#post-${postId} .like-value`) : $(`#post-${postId} .dislike-value`);
            var voteValue = parseInt(elVoteValue.text());
            voteValue = voteValue > 0 ? (el.hasClass('active') ? (voteValue + 1) : (voteValue - 1)) : 1;

            elVoteValue.text(voteValue > 0 ? voteValue : 0);

            $.post('/ajax/post/vote', {id: postId, type}, function (res) {
                postVoteLoading = false;
            })
        }
    }
});
$(document).on('click', '.post-action', function () {
    const action = $(this).data('action'), id = $(this).data('id');
    $.post('/ajax/post/update', {id, action}, function (res) {
        if (res) {
            res.status && toastr.success(res.msg, '', {timeOut: 6000});
            !res.status && toastr.error(res.msg, '', {timeOut: 6000});
        }
    });
});

var hasMore = true, cursor = '', loading = false, tags = $('.post-list').data('tags') || '',
    sort = $('.post-list').data('sort') || '';

function getPosts(type = 'all') {
    if (!loading && hasMore) {
        $('#loading-data').show();
        loading = true;
        $.get(`/ajax/post/list?type=${type}&cursor=${cursor}&tags=${tags}&sort=${sort}`, function (res) {
            hasMore = res.hasMore;
            cursor = res.nextCursor;
            $('.post-list').append(res.html);

            loading = false;
            $('#loading-data').hide();
        })
    }
}