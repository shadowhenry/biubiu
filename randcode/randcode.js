
$(document).ready(function() {
    $('.generate_pw').click(function() {
        var data = {};
        data.text = $('.usestr').val().trim();

        var len = $('.psdlen').val();
        if(len > data.text.length) {
            return len = data.text.length;
        }

        var randomString = generateRandomString(len, data.text)
        $('.RndResultTxt').val(randomString);
    });

    function generateRandomString(length, text) {
      // var characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+";
      var characters = text;
      var result = "";

      for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    var checkboxes = document.getElementsByClassName("checkbix");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("change", function() {
        var modifiedStr = modifyString();
        console.log(modifiedStr);
        $('.usestr').val(modifiedStr);
      });
    }


    function modifyString() {
      var str = $('.usestr').val().trim();
      // var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+";
      var checkboxes = document.getElementsByClassName("checkbix");

      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var dataText = checkbox.getAttribute("data-text");

        if (checkbox.checked) {
          switch (dataText) {
            case "number_array":
              if (!str.includes("0123456789")) {
                str += "0123456789";
              }
              break;
            case "letter_lowercase_array":
              if (!str.includes("abcdefghijklmnopqrstuvwxyz")) {
                str += "abcdefghijklmnopqrstuvwxyz";
              }
              break;
            case "letter_capital_array":
              if (!str.includes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")) {
                str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              }
              break;
            case "special_char_array":
              if (!str.includes("~!@#$%^&*()_+")) {
                str += "~!@#$%^&*()_+";
              }
              break;
          }
        } else {
          switch (dataText) {
            case "number_array":
              str = str.replace(/[0-9]/g, "");
              break;
            case "letter_lowercase_array":
              str = str.replace(/[a-z]/g, "");
              break;
            case "letter_capital_array":
              str = str.replace(/[A-Z]/g, "");
              break;
            case "special_char_array":
              str = str.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\+]/g, "");
              break;
          }
        }
      }

      return str;
    }


    var clipboard = new ClipboardJS('#copy', {
            text: function() {
                return $('.RndResultTxt').val();
            }
        });

        clipboard.on('success', function(e) {
            console.log('复制成功:', e.text);
        });

        clipboard.on('error', function(e) {
            console.error('复制失败:', e.text);
        });


});
