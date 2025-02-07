package com.gamecenter // Paket adınızı buraya girin (örneğin com.example.myapp)

import com.facebook.react.bridge.*
import android.graphics.BitmapFactory
import android.graphics.Bitmap
import android.graphics.Color
import java.net.URL
import com.facebook.react.bridge.Arguments // WritableArray için import ekleyin

class DominantColorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "DominantColor"

    @ReactMethod
    fun getDominantColorFromQuadrants(imagePath: String, promise: Promise) {
        try {
            val bitmap = loadImage(imagePath)
            if (bitmap == null) {
                promise.reject("IMAGE_LOAD_ERROR", "Resim yüklenemedi: $imagePath")
                return
            }

            val dominantColors = calculateDominantColorsFromQuadrants(bitmap)
            promise.resolve(dominantColors)

        } catch (e: Exception) {
            promise.reject("DOMINANT_COLOR_ERROR", "Baskın renkler hesaplanırken hata oluştu: ${e.message}", e)
        }
    }

    private fun loadImage(imagePath: String): Bitmap? {
        return try {
            if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
                val url = URL(imagePath)
                BitmapFactory.decodeStream(url.openConnection().getInputStream())
            } else if (imagePath.startsWith("content://") || imagePath.startsWith("file://") || !imagePath.contains("://")) {
                val absolutePath = if (!imagePath.startsWith("content://") && !imagePath.startsWith("file://") && !imagePath.contains("://")) {
                    imagePath
                } else {
                    imagePath
                }
                BitmapFactory.decodeFile(absolutePath)
            } else {
                null
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private fun calculateDominantColorForPixels(pixels: IntArray): Int {
        if (pixels.isEmpty()) return Color.BLACK // Boş piksel dizisi için varsayılan renk

        val colorMap = mutableMapOf<Int, Int>()
        for (pixel in pixels) {
            val color = pixel and 0xFFFFFF
            colorMap[color] = (colorMap[color] ?: 0) + 1
        }

        var dominantColor = Color.BLACK
        var maxCount = 0
        for ((color, count) in colorMap) {
            if (count > maxCount) {
                maxCount = count
                dominantColor = color
            }
        }
        return dominantColor or Color.BLACK
    }


    private fun calculateDominantColorsFromQuadrants(bitmap: Bitmap): WritableArray {
        val width = bitmap.width
        val height = bitmap.height
        val pixels = IntArray(width * height)
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height)

        val quadrantWidth = width / 2
        val quadrantHeight = height / 2

        val dominantColorsArray = Arguments.createArray()

        // Sol Üst Köşe
        val topLeftPixels = IntArray(quadrantWidth * quadrantHeight)
        for (y in 0 until quadrantHeight) {
            for (x in 0 until quadrantWidth) {
                topLeftPixels[y * quadrantWidth + x] = pixels[y * width + x]
            }
        }
        dominantColorsArray.pushString(String.format("#%06X", (0xFFFFFF and calculateDominantColorForPixels(topLeftPixels))))


        // Sağ Üst Köşe
        val topRightPixels = IntArray(quadrantWidth * quadrantHeight)
        for (y in 0 until quadrantHeight) {
            for (x in 0 until quadrantWidth) {
                topRightPixels[y * quadrantWidth + x] = pixels[y * width + (x + quadrantWidth)]
            }
        }
        dominantColorsArray.pushString(String.format("#%06X", (0xFFFFFF and calculateDominantColorForPixels(topRightPixels))))

        // Sol Alt Köşe
        val bottomLeftPixels = IntArray(quadrantWidth * quadrantHeight)
        for (y in 0 until quadrantHeight) {
            for (x in 0 until quadrantWidth) {
                bottomLeftPixels[y * quadrantWidth + x] = pixels[(y + quadrantHeight) * width + x]
            }
        }
        dominantColorsArray.pushString(String.format("#%06X", (0xFFFFFF and calculateDominantColorForPixels(bottomLeftPixels))))

        // Sağ Alt Köşe
        val bottomRightPixels = IntArray(quadrantWidth * quadrantHeight)
        for (y in 0 until quadrantHeight) {
            for (x in 0 until quadrantWidth) {
                bottomRightPixels[y * quadrantWidth + x] = pixels[(y + quadrantHeight) * width + (x + quadrantWidth)]
            }
        }
        dominantColorsArray.pushString(String.format("#%06X", (0xFFFFFF and calculateDominantColorForPixels(bottomRightPixels))))


        return dominantColorsArray
    }
}