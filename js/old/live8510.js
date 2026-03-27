const listCountDown = {};

function liveItemUpdateState() {
    $(`.live-item`).each((index, element) => {
        const $this = $(element);
        const currentTime = Math.floor(Date.now() / 1000);
        const airTime = $this.data('air-time');
        if (airTime > currentTime && !$this.hasClass('item-countdown')) {
            let diffTime = airTime - currentTime;
            const interval = 1000;

            if (diffTime <= 0) {
                $this.find('#state-live').show();
            } else {
                $this.addClass('item-countdown');
                listCountDown[$this.data('id')] = setInterval(function () {
                    if (diffTime <= 0) {
                        $this.find('#state-live').show();
                        $this.find('.live-tick-countdown').hide();
                        clearInterval(listCountDown[$this.data('id')]);
                    } else {
                        $this.find('.live-tick-countdown').show();
                        diffTime = diffTime - 1;
                        $this.find('.countdown').text(timeFormatBySeconds(diffTime));
                    }
                }, interval);
            }
        }
    });
}

function handleScrollToBottom(func) {
    window.onscroll = function () {
        if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 400)) {
            func();
        }
    }
}

var hasMore = true, cursor = '', loading = false, room = $('.live_content').data('room') || '';

function getLives(type = 'all') {
    if (!loading && hasMore) {
        $('#loading-data').show();
        loading = true;
        $.get(`/ajax/watch2gether/list?type=${type}&cursor=${cursor}&status=${room}`, function (res) {
            hasMore = res.hasMore;
            cursor = res.nextCursor;
            $('.live__-wrap').append(res.html);

            loading = false;
            $('#loading-data').hide();

            liveItemUpdateState();
        })
    }
}