package com.gamecenter;
import com.facebook.react.bridge.*
import android.graphics.BitmapFactory
import android.graphics.Bitmap
import android.graphics.Color
import java.net.URL

class DominantColorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "DominantColor" // JavaScript tarafında bu isimle çağıracağız

    @ReactMethod
    fun getDominantColor(imagePath: String, promise: Promise) {
        try {
            val bitmap = loadImage(imagePath)
            if (bitmap == null) {
                promise.reject("IMAGE_LOAD_ERROR", "Resim yüklenemedi: $imagePath")
                return
            }

            val dominantColor = calculateDominantColor(bitmap)
            val colorHexString = String.format("#%06X", (0xFFFFFF and dominantColor)) // Hex stringe dönüştür
            promise.resolve(colorHexString)

        } catch (e: Exception) {
            promise.reject("DOMINANT_COLOR_ERROR", "Baskın renk hesaplanırken hata oluştu: ${e.message}", e)
        }
    }

    private fun loadImage(imagePath: String): Bitmap? {
        return try {
            if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
                val url = URL(imagePath)
                BitmapFactory.decodeStream(url.openConnection().getInputStream())
            } else if (imagePath.startsWith("content://") || imagePath.startsWith("file://") || !imagePath.contains("://")) { // Yerel dosya veya content URI
                val absolutePath = if (!imagePath.startsWith("content://") && !imagePath.startsWith("file://") && !imagePath.contains("://")) {
                    // Eğer tam bir yol değilse (örneğin assets veya drawable içinde) tam yol gerekiyor.
                    // Burada basitçe dosya yolunu deniyoruz. Gerekirse assets ve drawable yollarını da ele alabilirsiniz.
                    imagePath
                } else {
                    imagePath
                }
                BitmapFactory.decodeFile(absolutePath)
            } else {
                null // Desteklenmeyen yol türü
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }


    private fun calculateDominantColor(bitmap: Bitmap): Int {
        val width = bitmap.width
        val height = bitmap.height
        val pixels = IntArray(width * height)
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height)

        val colorMap = mutableMapOf<Int, Int>() // Renk -> Sayı
        for (pixel in pixels) {
            val color = pixel and 0xFFFFFF // Alfa kanalını şimdilik görmezden geliyoruz
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
        return dominantColor or Color.BLACK // Gerekirse alfa kanalını tamamen opak yap
    }
}