'use strict';

var week = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: []
};
var selectedWeekday;

$(function () {
    $('.datetimepicker3').datetimepicker({
        format: 'HH:mm',
        stepping: 15
    });
});

function openModal(weekday) {
    var container = document.getElementById('timepicker-container');

    container.style.display = 'flex';

    selectedWeekday = weekday;
}

function closeModal() {
    var container = document.getElementById('timepicker-container');

    container.style.display = 'none';

    $('#timepicker-start').data('DateTimePicker').date(null);
    $('#timepicker-end').data('DateTimePicker').date(null);
}

function addTimeSlot() {
    var startTime = $('#timepicker-start').data('DateTimePicker').date();
    var endTime = $('#timepicker-end').data('DateTimePicker').date();

    if (!startTime || !endTime) {
        return openAlert('Select start time and end time');
    }

    var hoursStart = startTime.hours()
    var hoursEnd = endTime.hours();
    var minutesStart = startTime.minutes();
    var minutesEnd = endTime.minutes();

    if (
        (hoursStart === hoursEnd && minutesStart >= minutesEnd) ||
        hoursStart > hoursEnd
    ) {
        openAlert('Selected hours end on the next day');
    }

    closeModal();
}

function openAlert(message) {
    var container = document.getElementById('alert-container');
    var messageContainer = container.getElementsByClassName('alert-message')[0];

    container.style.display = 'flex';
    messageContainer.innerHTML = message;
}

function closeAlert() {
    var container = document.getElementById('alert-container');

    container.style.display = 'none';
}

