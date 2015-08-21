(function() {
    var Calendar = function($widget, year, month, events) {
        this.year  = year;
        this.month = month;
        this.$widget = $widget;
        this.events = events;

        var obj = this;
        this.$widget.find('.prev').click(function() { 
            obj.prevMonth();
        });
        this.$widget.find('.next').click(function() {
            obj.nextMonth();
        });
        this.$widget.find('.home').click(function() {
            obj.setMonth(new Date().getFullYear(), new Date().getMonth());
            window.eventList.showDate(new Date());  // another interdependence
        });

        this.setMonth(year, month);

    }

    Calendar.prototype.prevMonth = function() {
        if (this.month == 0) {
            this.setMonth(this.year - 1, 11)
        } else {
            this.setMonth(this.year, this.month - 1);
        }
    }

    Calendar.prototype.nextMonth = function() {
        if (this.month == 11) {
            this.setMonth(this.year + 1, 0)
        } else {
            this.setMonth(this.year, this.month + 1);
        }
    }

    Calendar.prototype.setMonth = function(year, month) {
        this.$widget.find('.square').detach();
        this.year = year;
        this.month = month;
        
        // change month title
        this.$widget.find('.title h2 span.month').text(new Date(year, month).toLocaleString('en-us', { month: 'long' }));

        // add in blanks before dates
        var blanks = new Date(year, month).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();

        for (var i = 0; i < blanks; i++) {
            var $square = $('<div class="square blank"><div class="content"></div></div>');
            this.$widget.append($square);
        }

        var today = new Date();

        if (today.getFullYear() !== year || today.getMonth() !== month) {
            today = null; 
        }

        // add in all the dates
        for (var i = 1; i < 32; i++) {
            var $square = $('<div class="square"><div class="content"><div class="table"><div class="table-cell"></div></div><div class="event-wrapper"><div class="event"></div></div></div></div>');
            $square.find('.table-cell').text(i)
            if (today != null && today.getDate() === i) {
                $square.addClass('today');
            }
            this.$widget.append($square);
        }
        var $list = $('.event-list');
        $list.find('ul').height(this.$widget.height() - $list.find('.header').height());

        for (var i = 0; i < this.events.length; i++) {
            var event_date = new Date(this.events[i].start_time);
            if (event_date.getMonth() === this.month && event_date.getFullYear() === this.year) {
                this.addEvent(this.events[i]);
            }
        }

        // add click listener (so far only interdependent - references window)
        var calendar = this;
        this.$widget.find('.square').click(function() {
            window.eventList.showDate(new Date(calendar.year, calendar.month, $(this).find('.table-cell').text() ));    
        });
        
    }
    Calendar.prototype.addEvent = function(event) {
        var date = new Date(event.start_time).getDate();
        $('.content').each(function() {
            var $content = $(this);
            if ($content.find('.table-cell').text() == date) { //contains("' + event.day + '")').length > 0) {
                $content.find('.event').append('<i class="fa fa-circle"></i>');
            }
        });
    }

    var EventList = function($widget, events) {
        this.events  = events;
        this.$widget = $widget;
        
        this.showDate(new Date());
    }
    EventList.prototype.showDate = function(date) {

        // get ordinal for a date
        var getOrd = function(n) {
          var ords = [,'st','nd','rd'];
          var ord, m = n%100;
          return ((m > 10 && m < 14) ? 'th' : ords[m%10] || 'th');
        }

        // wipe old
        this.$widget.find('li, hr').detach();

        // change to new 
        this.$widget.find('.header h3').text(date.toLocaleString('en-us', { weekday: 'long', month: 'long', day: 'numeric' }) + getOrd(date.getDate()));

        var anyEvents = false;
        for (var i = 0; i < this.events.length; i++) {
            var event_date = new Date(this.events[i].start_time);
            if (event_date.getFullYear() != date.getFullYear() ||
                event_date.getMonth()    != date.getMonth()    ||
                event_date.getDate()     != date.getDate()) {
                continue;
            }

            if (anyEvents) {
                this.$widget.find('ul').append('<hr>');
            }

            anyEvents = true;

            event_date = event_date.toLocaleString('en-us', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            var $event = $('<li><div class="event"><h3>' + this.events[i].name + '</h3> <h4> <i class="fa fa-calendar"></i> ' + event_date + ' <i class="fa fa-at"></i> ' + this.events[i].location + '</h4><p class="desc"></p><p><b> Contact Name : </b>' + this.events[i].contact_name + '</p><p><b> Contact Email : </b>' + this.events[i].contact_email + '</p><p class="branch"><b> Branch : </b>' + this.events[i].branch + '</p></div></li>');
            $event.find('.desc').text(this.events[i].description);

            // don't display branch if there is none
            if (this.events[i].branch === 'NONE') {
                $event.find('.branch').detach();
            }

            this.$widget.find('ul').append($event);
        }

        if (!anyEvents) {
            var $warning = $('<li><div class="event"><h3> No Events </h3></div></li>')
            this.$widget.find('ul').append($warning);
        }
    }

    
   
    var today = new Date();
    var $calendar = $('.calendar');
    var $list = $('.event-list');
    $.get('/eventsJSON', function(res) {
        var response = JSON.parse(res);
        window.eventList     = new EventList($list, response.events);
        window.eventCalendar = new Calendar($calendar, today.getFullYear(), today.getMonth(), response.events);
        $list.find('ul').height($calendar.height() - $list.find('.header').height());
    });
})();

