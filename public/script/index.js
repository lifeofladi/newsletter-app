console.log("connected!!");

$(document).ready(function () {
  //sets a custom email regex pattern.
  $.validator.methods.email = function (value, element) {
    return (
      this.optional(element) ||
      /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    );
  };

  //stops numeric char in text-type inputs.
  $("input[type='text']").keypress(function () {
    return /[a-z]/i.test(event.key);
  });

  //validation rules
  $("#newsletter").validate({
    rules: {
      fname: {
        minlength: 2,
        maxlength: 20,
      },
      lname: {
        minlength: 2,
        maxlength: 20,
      },
    },
  });
});
