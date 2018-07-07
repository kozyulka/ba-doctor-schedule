'use strict';

var WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
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

    startTime.year(0).month(0).date(1).second(0).millisecond(0);
    endTime.year(0).month(0).date(1).second(0).millisecond(0);

    var hoursStart = startTime.hours();
    var hoursEnd = endTime.hours();
    var minutesStart = startTime.minutes();
    var minutesEnd = endTime.minutes();
    var nightShift = false;

    if (
        (hoursStart === hoursEnd && minutesStart >= minutesEnd) ||
        hoursStart > hoursEnd
    ) {
        nightShift = true;

        openAlert('Selected hours end on the next day');
    }

    createTimeSlot(startTime, endTime, nightShift);
    closeModal();
}

function createTimeSlot(startTime, endTime, nightShift) {
    var tomeSlotsContainer = document.querySelector('#' + selectedWeekday + ' .weekday-time-wrapper');
    var timeSlot = document.createElement('div');
    var icon = document.createElement('i');
    var time = document.createElement('div');
    var startTimeContainer = document.createElement('span');
    var endTimeContainer = document.createElement('span');
    var startTimeValue = document.createTextNode(startTime.format('HH') + ':' + startTime.format('mm'));
    var endTimeValue = document.createTextNode(endTime.format('HH') + ':' + endTime.format('mm'));
    var divider = document.createTextNode(' - ');

    timeSlot.className = 'weekday-time-slot';
    time.className = 'time';
    icon.className = 'far fa-edit';
    icon.setAttribute('title', 'Edit time-slot');

    timeSlot.appendChild(icon);
    timeSlot.appendChild(time);
    time.appendChild(startTimeContainer);
    startTimeContainer.appendChild(startTimeValue);
    time.appendChild(divider);
    time.appendChild(endTimeContainer);
    endTimeContainer.appendChild(endTimeValue);

    if (nightShift) {
        endTimeContainer.className = 'night';

        var icon = document.createElement('i');

        icon.className = 'far fa-moon';
        icon.setAttribute('title', 'This shift ends next day');

        endTimeContainer.appendChild(icon);

        createNextDayTimeSlot(endTime);
    }

    tomeSlotsContainer.appendChild(timeSlot);
}

function createNextDayTimeSlot(endTime) {
    var currentWeekdayIndex = WEEKDAYS.indexOf(selectedWeekday);
    var nextWeekdayIndex = currentWeekdayIndex !== 6 ? currentWeekdayIndex + 1 : 0;
    var nextWeekday = WEEKDAYS[nextWeekdayIndex];

    var timeSlotsContainer = document.querySelector('#' + nextWeekday + ' .weekday-time-wrapper');
    var timeSlot = document.createElement('div');
    var time = document.createElement('div');
    var startTimeContainer = document.createElement('span');
    var endTimeContainer = document.createElement('span');
    var startTimeValue = document.createTextNode('00:00');
    var endTimeValue = document.createTextNode(endTime.format('HH') + ':' + endTime.format('mm'));
    var divider = document.createTextNode(' - ');

    timeSlot.className = 'weekday-time-slot disabled';
    timeSlot.setAttribute('title', 'This time-slot was added automatically from the previous day and cannot be edited. You can change hours in the previous day time-slot');
    time.className = 'time';

    timeSlot.appendChild(time);
    time.appendChild(startTimeContainer);
    startTimeContainer.appendChild(startTimeValue);
    time.appendChild(divider);
    time.appendChild(endTimeContainer);
    endTimeContainer.appendChild(endTimeValue);

    timeSlotsContainer.appendChild(timeSlot);
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
