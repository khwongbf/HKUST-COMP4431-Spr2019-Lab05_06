(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        
        
        
        
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                
                var sumRx = 0, sumGx = 0, sumBx = 0;

                // The following code applies the 3x3 Gx kernel to the image, without division 
                /* Sum the product of the kernel on the pixels */
                for (var j = -1; j <= 1 ; j++) {
                    for (var i = -1  ; i <= 1; i++) {
                        var pixel = imageproc.getPixel(inputData, x + i, y + j);

                        var coeff = Gx[j + 1][i + 1];


                        sumRx += pixel.r * coeff;
                        sumGx += pixel.g * coeff;
                        sumBx += pixel.b * coeff;
                    }
                }
                
                var grayscalex = (sumRx + sumGx + sumBx) / 3;
                
                var sumRy = 0, sumGy = 0, sumBy = 0;

                // The following code applies the 3x3 Gy kernel to the image, without division 
                /* Sum the product of the kernel on the pixels */
                for (var j = -1; j <= 1 ; j++) {
                    for (var i = -1  ; i <= 1; i++) {
                        var pixel = imageproc.getPixel(inputData, x + i, y + j);

                        var coeff = Gy[j + 1][i + 1];


                        sumRy += pixel.r * coeff;
                        sumGy += pixel.g * coeff;
                        sumBy += pixel.b * coeff;
                    }
                }
                
                var grayscaley = (sumRy + sumGy + sumBy) / 3;
                
                var i = (x + y * outputData.width) * 4;
                
                var edgeStrength = Math.hypot(grayscalex, grayscaley);
                
                
                
                outputData.data[i]     = (edgeStrength > threshold) ? 255: 0;
                outputData.data[i + 1] = (edgeStrength > threshold) ? 255: 0;
                outputData.data[i + 2] = (edgeStrength > threshold) ? 255: 0;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
