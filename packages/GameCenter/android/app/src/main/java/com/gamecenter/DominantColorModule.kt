package com.gamecenter;
import com.facebook.react.bridge.*
import android.graphics.BitmapFactory
import android.graphics.Bitmap
import android.graphics.Color
import java.net.URL
import java.io.FileInputStream
import java.io.File
import androidx.palette.graphics.Palette

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
            val inputStream = when {
                imagePath.startsWith("http://") || imagePath.startsWith("https://") -> {
                    URL(imagePath).openConnection().apply {
                        connectTimeout = 5000
                        readTimeout = 5000
                    }.getInputStream()
                }
                else -> FileInputStream(File(imagePath))
            }

            val options = BitmapFactory.Options().apply {
                inJustDecodeBounds = true
            }
            BitmapFactory.decodeStream(inputStream, null, options)
            inputStream.close()

            options.inSampleSize = calculateInSampleSize(options, 100, 100)
            options.inJustDecodeBounds = false

            val newInputStream = when {
                imagePath.startsWith("http://") || imagePath.startsWith("https://") ->
                    URL(imagePath).openStream()
                else -> FileInputStream(File(imagePath))
            }

            return BitmapFactory.decodeStream(newInputStream, null, options).also {
                newInputStream.close()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private fun calculateInSampleSize(options: BitmapFactory.Options, reqWidth: Int, reqHeight: Int): Int {
        val (height: Int, width: Int) = options.run { outHeight to outWidth }
        var inSampleSize = 1

        if (height > reqHeight || width > reqWidth) {
            val halfHeight = height / 2
            val halfWidth = width / 2

            while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
                inSampleSize *= 2
            }
        }
        return inSampleSize
    }

    private fun calculateDominantColor(bitmap: Bitmap): Int {
        return try {
            val palette = Palette.from(bitmap)
                .maximumColorCount(8) // Optimize color analysis
                .generate()
            palette.dominantSwatch?.rgb ?: Color.BLACK
        } catch (e: Exception) {
            Color.BLACK
        }
    }
}