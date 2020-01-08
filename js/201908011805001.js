 $(function () {
	// 隐式创建一个input控件，然后实现直接访问相册
	var inputUploadObj = '';
	$("#btnUpload").on("click", function () {
		//获取文件上传文件的文件名和扩展名
		if ($("#image")[0].files == undefined) {
			alert('未上传任何文件！');
		} else {
			console.log($("#image")[0].files);
		   
			alert(JSON.stringify($("#image")[0].files));
			$.ajax({
				type: 'post',
				url: "download.php",
				data: {
					files: $("#image")[0].files,
				},
				dataType: "json",
				success: function (data) {
					if (data.status) {
						alert(data.msg);
						return false;
					} else {
						alert(data.msg);
						return false;
					}
				}
			});
		}
	})
})