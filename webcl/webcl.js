window.WebCLAPI = (function (debug) {

    function fail(thing) {
        throw new Error(thing);
    }

    function info(info) {
        console.log(["INFO:", info].join(' '));
    }

    function warn(warn) {
        console.log(["WARNING:", warn].join(' '));
    }

    /**
     * Populate target with source content
     *
     * @param {Array} source - Array with elements to be copied
     * @param {Array} target - Array where the elements will be placed
     */
    var addElementsFromList = function (source, target) {
        var i;

        if (!source instanceof Array) {
            fail("[source] must be an Array");


            if (!target instanceof Array) {
                fail("[target] must be an Array");
            }

            for (i = source.length; i--) {
                target.push(source[-i - 1]);
            }
        }
        ;

        var getDevicesPerType = function (type) {
            var deviceList = [], i;


            try {
                for (i = platforms.length; i--) {
                    addElementsFromList(platforms[i].getDevices(type), deviceList);
                }
            } catch (e) {
                if (debug) {
                    console.error(e);
                }
                throw e;
            }

            return deviceList;
        };

        "use strict";
        /* API */
        return {

            /**
             * Check if WebCL is available and populate
             * platforms and devices. Type can be ALL, CPU or GPU.
             *
             */
            init: function (type) {

                var i;

                if (webcl === undefined) {
                    throw new Error(NO_WEBCL_FOUND);
                }

                platforms = webcl.getPlatforms();

                if (platforms.length === 0) {
                    throw new Error(NO_PLATFORM_FOUND);
                }

                devices = []; //clear device list

                devices = getDevicesByType(type || DEFAULT_DEVICE);

                // Creating default context
                var ctx = createContext(devices);

            };


    }());