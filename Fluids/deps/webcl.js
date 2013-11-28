//helper functions

function clDeviceQuery() {
	var deviceList = [];
	var platforms = (window.WebCL && WebCL.getPlatforms()) || [];
	for (var p = 0, i = 0; p < platforms.length; p++) {
		var plat = platforms[p];
		var devices = plat.getDevices(WebCL.CL_DEVICE_TYPE_ALL);
		for (var d = 0; d < devices.length; d++, i++) {
			if (devices[d].getInfo(WebCL.CL_DEVICE_AVAILABLE) === true) {
				var availableDevice = {
					'device' : devices[d], 
					'type' : devices[d].getInfo(WebCL.CL_DEVICE_TYPE),
					'name' : devices[d].getInfo(WebCL.CL_DEVICE_NAME),
					'version' : devices[d].getInfo(WebCL.CL_DEVICE_VERSION),
					'vendor' : plat.getInfo(WebCL.CL_PLATFORM_VENDOR),
					'platform' : plat
				};
				deviceList.push(availableDevice);
			}
		}
	}
	return deviceList;
}
