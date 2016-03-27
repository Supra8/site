Notify.info = function(Title, Message) {

  var Index = ++Notify.Index;

  var HTML = "<div style='right: -350px;' icon='' id='notification-" + Notify.Index + "' class='notification info'>";
  HTML += "<div class='title'>" + Title + "</div>";
  HTML += "<div class='message'>" + Message + "</div>";
  HTML += "</div>";

  var $Nofication = $.parseHTML(HTML);
  Notify.show($Nofication, Index);

};
