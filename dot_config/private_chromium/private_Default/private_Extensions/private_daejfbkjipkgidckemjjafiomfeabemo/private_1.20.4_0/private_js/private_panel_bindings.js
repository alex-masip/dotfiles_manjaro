// Generated by CoffeeScript 1.12.7

/**
@license Copyright (C) 2012 Observepoint LLC. All rights reserved.
 */
$(document).ready(function() {
  $("#network-close-button").bind('click', function(event) {
    return resetColumns();
  });
  $(".tabselector").bind('click', function(event) {
    $(".active_tab").removeClass("active_tab");
    $(this).addClass("active_tab");
    $(".tabcontent").hide();
    return $("#" + $(this).attr("id") + "-data").show();
  });
  $("img.filter").bind('click', function(event) {
    var _this, filter;
    _this = $(this);
    filter = _this.next("input.filter");
    return filter.toggle(0, function() {
      var value;
      if (filter.is(":visible")) {
        return _this.attr("src", "img/filter-active.gif");
      } else {
        value = filter.val().trim();
        if (!value || 0 === value.length) {
          return _this.attr("src", "img/filter.gif");
        }
      }
    });
  });
  return $("input.filter").bind('input', function(event) {
    return applySearch();
  });
});

$(document).keydown(function(e) {
  var next, prev, row, tab;
  if (e.keyCode === 38) {
    row = $(".active_row");
    if (row) {
      prev = false;
      $($('.observepoint-analytics-tag').get().reverse()).each(function() {
        var _this, main_area;
        if (prev) {
          _this = $(this);
          main_area = $('#main_area_data_container');
          _this.click();
          if (_this.position().top < main_area.scrollTop() + _this.height()) {
            main_area.scrollTop(_this.position().top - _this.height());
          }
          return false;
        }
        if ($(this).hasClass('active_row')) {
          return prev = true;
        }
      });
    }
  }
  if (e.keyCode === 40) {
    row = $(".active_row");
    if (row) {
      next = false;
      $('.observepoint-analytics-tag').each(function() {
        var _this, main_area;
        if (next) {
          main_area = $('#main_area_data_container');
          _this = $(this);
          _this.click();
          if (_this.position().top >= main_area.height() + main_area.scrollTop() - _this.height()) {
            main_area.scrollTop(_this.position().top - main_area.height() + _this.height());
          }
          return false;
        }
        if ($(this).hasClass('active_row')) {
          return next = true;
        }
      });
    }
  }
  if (e.keyCode === 37) {
    tab = $(".active_tab");
    if (tab) {
      tab.prev(".tabselector").click();
    }
  }
  if (e.keyCode === 39) {
    tab = $(".active_tab");
    if (tab) {
      return tab.next(".tabselector").click();
    }
  }
});
