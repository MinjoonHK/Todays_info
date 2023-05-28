function copyToClipboard(val){
    var text = document.createElement("textarea");
    document.body.appendChild(text);
    text.value = val;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);
  }

  $().ready(function () {
    $(".alertStart").click(function () {
        Swal.fire({
            icon: 'success',
            title: 'Successfully Copied to Clipboard',
            text: 'ctrl + v to paste.',
        });
    });
});