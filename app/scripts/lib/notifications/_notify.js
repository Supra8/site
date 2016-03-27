var Notify = {};

Notify.Index = 0;

Notify.show = function($Notification, Index) {
  var $Notifications = $("#notifications");
  $Notifications.append($Notification);
  var $NotificationIdentifier = $("#notification-" + Index);
  $NotificationIdentifier.animate({
    right: "0px"
  }, 200).delay(7000).animate({
    right: "-350px"
  }, 200, function() {
  }).animate({
    height: "0px"
  }, 200, function() {
    $NotificationIdentifier.remove();
  });
};
